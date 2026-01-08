const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const GoogleAdsLead = sequelize.define(
  "GoogleAdsLead",
  {
    event: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gclid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    campaignId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    adGroupId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    conversionName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    value: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    conversionTime: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    tableName: "google_ads_leads",
    timestamps: true
  }
);

module.exports = GoogleAdsLead;
