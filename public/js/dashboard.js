function openEditModal(id,username) {
    document.getElementById('editModal').style.display = 'flex';
    document.getElementById('id').value = id;
    document.getElementById('username').value = username
}

let userId 

function openDeleteModal(Id) {
    userId = Id
    document.getElementById('deleteModal').style.display = 'flex';
}


function openAddUserModal() {
    document.getElementById('addUserModal').style.display = 'flex';
}


function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function confirmDelete(){
    // console.log("User ID for deletion:", userId);
    window.location.href = `/admin/delete-user/${userId}`; 
}