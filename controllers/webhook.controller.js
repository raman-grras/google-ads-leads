const fs = require('fs').promises;
const path = require('path');

//  POST - Webhook receive karne ke liye
const googleAdsWebhook = async (req, res) => {
  try {
    // Secret key validation
    const secretKey = req.headers['x-webhook-secret'];

    console.log(secretKey)

    if (!secretKey || secretKey !== process.env.GOOGLE_ADS_WEBHOOK_SECRET) {
      console.warn('⚠️ Unauthorized webhook attempt from IP:', req.ip);

      return res.status(401).json({
        success: false,
        message: "Unauthorized webhook request"
      });
    }

    // Single JSON file path
    const logFilePath = path.join(__dirname, '../webhook-data.json');

    // Current webhook ka data
    const webhookData = {
      timestamp: new Date().toISOString(),
      headers: req.headers,
      body: req.body,
      query: req.query,
      ip: req.ip,
      method: req.method
    };

    //  Existing data read karo
    let allWebhooks = [];
    try {
      const fileContent = await fs.readFile(logFilePath, 'utf8');
      allWebhooks = JSON.parse(fileContent);
    } catch (error) {
      console.log('📝 Creating new webhook-data.json file');
      allWebhooks = [];
    }

    // Naya data add karo
    allWebhooks.push(webhookData);

    //  File mein save karo
    await fs.writeFile(
      logFilePath,
      JSON.stringify(allWebhooks, null, 2),
      'utf8'
    );

    console.log(` Webhook data saved! Total entries: ${allWebhooks.length}`);

    //  Success response
    res.status(200).json({
      success: true,
      message: "Webhook data received and saved",
      totalEntries: allWebhooks.length
    });

  } catch (error) {
    console.error('❌ Error saving webhook data:', error.message);

    res.status(500).json({
      success: false,
      message: "Error saving webhook data",
      error: error.message
    });
  }
};

//  GET - Saara webhook data retrieve karne ke liye
const getAllWebhookData = async (req, res) => {
  try {
    const logFilePath = path.join(__dirname, '../webhook-data.json');

    //  File read karo
    let allWebhooks = [];
    try {
      const fileContent = await fs.readFile(logFilePath, 'utf8');
      allWebhooks = JSON.parse(fileContent);
    } catch (error) {
      // File nahi hai
      return res.status(200).json({
        success: true,
        message: "No webhook data found",
        data: [],
        count: 0
      });
    }

    //  Query parameters se filtering (optional)
    const { event, gclid, limit } = req.query;

    let filteredData = allWebhooks;

    // Filter by event
    if (event) {
      filteredData = filteredData.filter(item =>
        item.body?.event?.toLowerCase() === event.toLowerCase()
      );
    }

    // Filter by gclid
    if (gclid) {
      filteredData = filteredData.filter(item =>
        item.body?.gclid === gclid
      );
    }

    // Limit results
    if (limit) {
      filteredData = filteredData.slice(-parseInt(limit));
    }

    // Response
    res.status(200).json({
      success: true,
      message: "Webhook data retrieved successfully",
      count: filteredData.length,
      totalCount: allWebhooks.length,
      data: filteredData
    });

  } catch (error) {
    console.error('❌ Error reading webhook data:', error.message);

    res.status(500).json({
      success: false,
      message: "Error reading webhook data",
      error: error.message
    });
  }
};


module.exports = {
  googleAdsWebhook,
  getAllWebhookData
};