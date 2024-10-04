// hiển thị profile của người dùng
// sửa thông tin của người dùng
// thay đổi mật khẩu
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserSetting() {
    const [user, setUser] = useState({
        username: '',
        password: ''
      });
    
      const [message, setMessage] = useState('');
    
      useEffect(() => {
        // Lấy thông tin người dùng từ server khi trang được load
        axios.get('') // chưa có API
          .then(response => {
            setUser(response.data);
          })
          .catch(error => {
            console.error('Error fetching user data:', error);
          });
      }, []);
    
      const handleChange = (e) => {
        setUser({
          ...user,
          [e.target.name]: e.target.value
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Gửi thông tin cập nhật lên server
        axios.put('', user) //chưa có API
          .then(response => {
            setMessage('Profile updated successfully!');
          })
          .catch(error => {
            setMessage('Error updating profile.');
            console.error('Error updating profile:', error);
          });
      };
    
      return (
        <div>
          <h2>Edit Profile</h2>
          {message && <p>{message}</p>}
          <div class="account-info">
            <h2>THÔNG TIN TÀI KHOẢN</h2>
            <form onSubmit={handleSubmit}>
              <table>
                <tr>
                  <th>
                    <label htmlFor="username">Username:</label>
                  </th>
                  <th>
                    <span>{user.username}</span>
                  </th>
                  <th>
                    <button>Change</button>
                  </th>
                </tr>
              </table>
              <div>
                
                
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit">Save</button>
            </form>
            <div class="order-section">
                <h3>Đơn hàng gần nhất</h3>
                <table class="order-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Ngày</th>
                            <th>Chuyển đến</th>
                            <th>Địa chỉ</th>
                            <th>Giá trị</th>
                            <th>TT Thanh toán</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="6">Không có đơn hàng nào.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="customer-info">
                <h3>Thông tin khách hàng</h3>
                <div class="customer-details">
                    <p><i class="icon-user"></i> Linh Tuấn</p>
                    <p><i class="icon-location"></i></p>
                    <button class="address-book">SỔ ĐỊA CHỈ (0)</button>
                </div>
            </div>
        </div>
    </div>
  )
}