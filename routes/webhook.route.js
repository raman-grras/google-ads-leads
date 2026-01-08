const express = require("express");
const router = express.Router();

const {  googleAdsWebhook, getAllWebhookData } = require('../controllers/webhook.controller');

// ✅ POST - Webhook receive
router.post('/google-ads', googleAdsWebhook);

// ✅ GET - Saara data retrieve
router.get('/google-ads', getAllWebhookData);


module.exports = router;
