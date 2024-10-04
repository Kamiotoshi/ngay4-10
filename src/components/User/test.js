import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserSetting() {
  const [user, setUser] = useState({
    username: '',
    password: '',
    email: '',
    phone: ''
  });
  const [editingField, setEditingField] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reNewPassword, setReNewPassword] = useState('');
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
    axios.put('', user) // chưa có API
      .then(response => {
        setMessage('Profile updated successfully!');
        setEditingField(null); // Reset editing state
      })
      .catch(error => {
        setMessage('Error updating profile.');
        console.error('Error updating profile:', error);
      });
  };

  const handlePasswordChange = () => {
    if (currentPassword !== user.password) {
      setMessage('Current password is incorrect.');
    } else if (newPassword === user.password) {
      setMessage('New password must be different from the old password.');
    } else if (newPassword !== reNewPassword) {
      setMessage('Passwords do not match.');
    } else {
      setUser({ ...user, password: newPassword });
      setMessage('Password updated successfully!');
      setEditingField(null); // Reset editing state
    }
  };

  const startEditing = (field) => {
    setEditingField(field); // Set which field is being edited
    setMessage(''); // Clear message
  };

  return (
    <div class={"account-info"}>
      <h2>Edit Profile</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <table>
          {/* Username */}
          <tr>
            <th>Username:</th>
            <th>{user.username}</th>
          </tr>

          {/* Email */}
          <tr>
            <th>Email:</th>
            <th>
              {editingField === 'email' ? (
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              ) : (
                user.email
              )}
            </th>
            <th>
              {editingField !== 'email' && <button onClick={() => startEditing('email')}>Change</button>}
            </th>
          </tr>

          {/* Phone */}
          <tr>
            <th>Phone:</th>
            <th>
              {editingField === 'phone' ? (
                <input
                  type="text"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                />
              ) : (
                user.phone
              )}
            </th>
            <th>
              {editingField !== 'phone' && <button onClick={() => startEditing('phone')}>Change</button>}
            </th>
          </tr>

          {/* Password */}
          <tr>
            <th>Password:</th>
            <th>********</th>
            <th>
              {editingField !== 'password' && <button onClick={() => startEditing('password')}>Change</button>}
            </th>
          </tr>

          {/* Nếu đang chỉnh sửa mật khẩu */}
          {editingField === 'password' && (
            <>
              <tr>
                <th>Current Password:</th>
                <th>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </th>
              </tr>
              <tr>
                <th>New Password:</th>
                <th>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </th>
              </tr>
              <tr>
                <th>Re-enter New Password:</th>
                <th>
                  <input
                    type="password"
                    value={reNewPassword}
                    onChange={(e) => setReNewPassword(e.target.value)}
                  />
                </th>
              </tr>
            </>
          )}
        </table>

        {/* Nút Save hiện ra khi đang chỉnh sửa */}
        {editingField && (
          <button type="button" onClick={editingField === 'password' ? handlePasswordChange : handleSubmit}>
            Save
          </button>
        )}
      </form>
      <div class="order-section">
                <h3>Order History</h3>
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
    </div>
  );
}
