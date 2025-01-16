const express=require('express');
const router=express.Router();
const adminController=require('../controller/adminController')

const adminAuth=require('../middleware/adminAuth')

router.get('/login',adminAuth.isLogin,adminController.loadLogin)
router.post('/login',adminController.login)

router.get('/dashboard',adminAuth.CheckSession,adminController.loadDashboard)
router.post('/edit-user',adminAuth.CheckSession,adminController.editUser)


router.get('/delete-user/:id',adminAuth.CheckSession,adminController.deleteUser)

router.post('/add-user',adminAuth.CheckSession,adminController.addUser)

router.get('/logout',adminAuth.CheckSession,adminController.logout)
router.get('/search', adminAuth.CheckSession, adminController.searchUsers);

module.exports=router