const adminModel=require('../model/adminModel')
const bcrypt=require('bcrypt');
const userModel=require('../model/userModel')

const loadLogin=async(req,res)=>{
    res.render('admin/login',{message:''})
}

const login=async(req,res)=>{
    try{
        const{email,password}=req.body
        const admin=await adminModel.findOne({email})
        if(!admin) return res.render('admin/login',{message:'Invalid Credentials'})
        const isMatch=await bcrypt.compare(password,admin.password)
        if(!isMatch) return res.render('admin/login',{message:'Invalid credentials'})
        req.session.admin=true;
        res.redirect('/admin/dashboard')

    }
    catch(error){
        res.send(error)
    }
   
}

 const loadDashboard=async(req,res)=>{
    try{
        const admin=req.session.admin
        if(!admin)return res.redirect('/admin/login')
        const users=await userModel.find({})
        
        res.render('admin/dashboard',{users})
    }
catch(error){
   console.log(error)
}
 }

 const editUser=async (req,res)=>{
    try{


    //     const {username,password,id}=req.body
    //     console.log(username,password);
        
    //     const hashedPassword=await bcrypt.hash(password,10)
    //     console.log(username,password,id);

    //     const user=await userModel.findOneAndUpdate({_id:id},
    //         {$set:{username:username,password:hashedPassword}})
    //    res.redirect('/admin/dashboard')
    const {  email} = req.body;  
        const id = req.params.id;  
        console.log(id);

       
        const updateData = {
            
            email
        };

       
        const user = await userModel.findByIdAndUpdate(id, updateData, { new: true });

   
        console.log(user);
        res.redirect("/admin/dashboard")

         

    }catch(error){
        console.log(error);
        res.status(500).json({ error: "An error occurred while updating the user" });
   
    }
 }

 const deleteUser=async(req,res)=>{

try{
    // const { id }= req.params
    // await userModel.findByIdAndDelete({_id:id})
    // // const user=await userModel.findByIdAndDelete({_id:id})
    // res.redirect('/admin/dashboard')



    const {  email} = req.body;  
    const id = req.params.id;  
    console.log(id);

   
    const deleteData = {
        email
    };

   
    const user = await userModel.findByIdAndDelete(id, deleteData, { new: true });


    console.log(user);

    
    res.redirect("/admin/dashboard")




}catch(error){
    console.log(error);
    res.status(500).json({ error: "An error occurred while deleting the user" });
     
}

}

 const addUser=async (req,res)=>{
    try{
        // const {username,password}=req.body
        // const hashedPassword= await bcrypt.hash(password,10)
        // const newUser=new userModel({
        //     username,
        //     password:hashedPassword
        // })

        // await newUser.save()
        // res.redirect('/admin/dashboard')

        const {  email, password} = req.body;

        // Check if required fields are present
        if ( !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        // Create a new user document
        const user = new userModel({
        
            email,
            password:hashedPassword
        });
    
        
        // Save the new user to the database
        await user.save();

        console.log("User added:", user);

        // Redirect or respond as necessary
        res.redirect("/admin/dashboard");




    }catch(error){
        console.log(error);
        
    }
 }

const searchUsers = async (req, res) => {
    try {
        const searchTerm = req.query.search;
        const users = await userModel.find({
            username: { $regex: searchTerm, $options: 'i' }  // Case-insensitive search
        });
        res.render('admin/dashboard', { users });
    } catch (error) {
        console.log(error);
        res.redirect('/admin/dashboard');
    }
}

const logout=async (req,res)=>{
    req.session.admin = null
    res.redirect('/admin/login')
}

module.exports={loadLogin,login,loadDashboard,editUser,deleteUser,addUser,logout,searchUsers}