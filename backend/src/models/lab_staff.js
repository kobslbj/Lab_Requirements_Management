const mongoose = require("mongoose");

const Lab_staff_Schema = mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },

    name:{
        type: String,
        required: true,
    },

    lab_name:{
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return ['Chemical', 'Surface', 'Composition'].includes(value);
            },
            message: props => `${props.value} is not a valid lab name. Lab name must be one of: Chemical, Surface, Composition`
        }
    },
    
  },
  {
    timestamps: true,
  }
);

const Lab_staff = mongoose.model("Lab_staff", Lab_staff_Schema);

module.exports = Lab_staff;