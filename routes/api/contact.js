const express = require("express");
const router = express.Router();
const unique_id = require("uuid");

let contact = require("../../input");

router.get("/", (req,res)=>{
    res.json(contact);
});

router.get("/:id", (req,res)=>{
    const found = contact.some(user => user.id===parseInt(req.params.id));

    if(found){
        res.json(contact.filter(user=> user.id === parseInt(req.params.id)))
    }
    else{
        res.sendStatus(404);
        res.json(
            {
            "error": "There is no contact with that id"
            });
            
    }
    
});

router.post(("/", (req,res) => {
    const newContact = {
        id:unique_id.v1(),
        name:req.body.name,
        lastName:req.body.lastname,
        email:req.body.email,
        phone:req.body.phone
    };

    if(!newContact.name || !newContact.email || !newContact.phone){
        res.sendStatus(400);
    }
    contact.push(newContact);
    res.json(contact);
    res.sendStatus(201);
}))


router.put("/:id", (req,res)=> {
    const found = contact.some(user => user.id===parseInt(req.params.id));
    if(found){
        const updateContact = req.body;
        contact.forEach(user => {
            if(user.id === parseInt(req.params.id)){
                user.name = updateContact.name ? updateContact.name:user.name;
                user.lastName = updateContact.lastName ? updateContact.lastname:user.lastName;
                user.email = updateContact.email ? updateContact.email:user.email;
                user.phone = updateContact.phone ? updateContact.phone:user.phone;
                res.sendStatus(204);
            res.json({message:"update the contact", user})
            
            }
        });
    }else{
        res.sendStatus(404);
       res.json(
    {
     "error": "There is no contact with that id"
     });

    }
});

router.delete("/:id",(req,res)=>{
    const found = contact.some(user => user.id===parseInt(req.params.id));

    if(found){
        contact = contact.filter(user=>user.id !== parseInt(req.params.id))
        res.sendStatus(204);
        res.json({
            message:"contact deleted",
        })
    }
    else{
        res.sendStatus(204);
    }
})
module.exports = router;