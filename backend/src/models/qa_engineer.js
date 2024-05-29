const mongoose = require("mongoose");

const QA_engineer_Schema = mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    fab_name: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return ["Fab A", "Fab B", "Fab C"].includes(value);
        },
        message: (props) =>
          `${props.value} is not a valid fab name. Fab name must be one of: Fab A, Fab B, Fab C`,
      },
    },
  },
  {
    timestamps: true,
  }
);

const QA_engineer = mongoose.model("QA_engineer", QA_engineer_Schema);

module.exports = QA_engineer;
