import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import apiClient from '../apiService/Apiservice';

const UserList = () => {
  const [users, setUsers]= useState([]);
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      const response = await apiClient.get('/allUsers');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  const deleteUser = async (id) => {
    try {
      const response = await apiClient.delete(`/deleteUser/${id}`);
      fetchUsers(); 
    } catch (error) {
      console.error('Error deleting product:', error);
    }
    setTimeout(() => 3000);
  };

  return (
    <div>
      <h2>User List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index+1}</td>
              <td>{user.email}</td>
              <td>
              <button className="btn btn-danger btn-sm ml-2" onClick={()=>deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserList;
