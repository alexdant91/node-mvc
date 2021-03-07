const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanyModel = require('../../../database/models/Company');
const CompanySchema = new Schema(CompanyModel(mongoose.Schema.Types), { timestamps: true });

const CustomerModel = require('../../../database/models/Customer');
const CustomerSchema = new Schema(CustomerModel(mongoose.Schema.Types), { timestamps: true });

const NotificationModel = require('../../../database/models/Notification');
const NotificationSchema = new Schema(NotificationModel(mongoose.Schema.Types), { timestamps: true });

const ProjectModel = require('../../../database/models/Project');
const ProjectSchema = new Schema(ProjectModel(mongoose.Schema.Types), { timestamps: true });

const UserModel = require('../../../database/models/User');
const UserSchema = new Schema(UserModel(mongoose.Schema.Types), { timestamps: true });

module.exports = [
  {
    name: "Company",
    schema: CompanySchema
  },
  {
    name: "Customer",
    schema: CustomerSchema
  },
  {
    name: "Notification",
    schema: NotificationSchema
  },
  {
    name: "Project",
    schema: ProjectSchema
  },
  {
    name: "User",
    schema: UserSchema
  },
]
