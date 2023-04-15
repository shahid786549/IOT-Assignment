const mongoose=require('mongoose');
const slugify=require('slugify');
const validator=require('validator');

const comunitySchema=new mongoose.Schema({
    name:{
        type: String,
        required:[true,'A role must have name'],
        unique:true,
        trim:true,
        maxlength:[20,'A tour name must have less or equal to 40 characters'],
        minlength:[5,'A tour name must have more or equal to 10 characters']
    },
    
      slug: {
        type: String,
        unique: true
      },
      owner: {
        type: Number,
        unique:true
      },
      roleCreatedAt: {
        type: Date,
        default: Date.now
      },
      roleUpdatedAt: {
        type: Date,
        default: Date.now
      }
});
//Generate the slug from the name
comunitySchema.pre('save', function(next) {
   this.slug = slugify(this.name, { lower: true });
    next();
  });
const Comunity=mongoose.model('Comunity',comunitySchema);

module.exports=Comunity;