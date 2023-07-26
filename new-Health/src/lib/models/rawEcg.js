import datastore from '../../lib/service/db/datastore'
import Mongoose from 'mongoose'

export default EcgRawModel()

function EcgRawModel() {
  const Schema = Mongoose.Schema

  const EcgRawSchema = new Schema({
    username: {
      type: String,
      required: true
    },
    hr: Number,
    pr: Number,
    qrs: Number,
    qt: Number,
    qtc: Number,
    lead1: [Number],
    lead2: [Number],
    lead3: [Number],
    v1: [Number],
    v2: [Number],
    v3: [Number],
    v4: [Number],
    v5: [Number],
    v6: [Number],
    avL: [Number],
    avR: [Number],
    avF: [Number],
    mcodeLead1: String,
    mcodeLead2: String,
    mcodeLead3: String,
    mcodeLeadavR: String,
    mcodeLeadavF: String,
    mcodeLeadavL: String,
    mcodeLeadv1: String,
    mcodeLeadv2: String,
    mcodeLeadv3: String,
    mcodeLeadv4: String,
    mcodeLeadv5: String,
    mcodeLeadv6: String,
    longLead: [Number],
    deviceId: String,
    batteryLevel: Number,
    leadCount: Number,
    lat: String,
    long: String,
    pdfurl: String,
    createdTs: Date,
    deviceType: String,
    fullReport: Boolean,
    creationDate: Date,
    modificationDate: Date
  })

  return {
    createNew: async function createNew(ecg) {
        console.log('raw modal')
        EcgRawSchema.pre('save', function (next) {
        this.creationDate = new Date()
        this.modificationDate = new Date()
        next()
      })

      EcgRawSchema.set('toJSON', {
        transform: function (doc, ret, options) {
          ret.id = ret._id
          delete ret._id
          delete ret.__v
        }
      })
      const EcgRawModel = Mongoose.model('ecgRaw', EcgRawSchema)
      return await datastore.addToStoreRaw(new EcgRawModel(ecg))
    }
  }
}