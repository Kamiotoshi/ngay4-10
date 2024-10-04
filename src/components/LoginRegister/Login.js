import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginErrors, setLoginErrors] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Hàm kiểm tra định dạng email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Hàm kiểm tra hợp lệ form đăng nhập
  const validateLogin = () => {
    let errors = { email: '', password: '' };
    let isValid = true;

    if (!validateEmail(loginData.email)) {
      errors.email = 'Định dạng email không hợp lệ';
      isValid = false;
    }
    if (loginData.password.length < 6) {
      errors.password = 'Mật khẩu phải ít nhất 6 ký tự';
      isValid = false;
    }

    setLoginErrors(errors);
    return isValid;
  };

  // Xử lý form đăng nhập
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (validateLogin()) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          'https://projectky320240926105522.azurewebsites.net/api/Admin/login', // Thay bằng URL API của bạn
          loginData, // Dữ liệu đăng nhập
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const data = response.data; // Lấy dữ liệu từ phản hồi của API
        console.log("Dữ liệu đăng nhập thành công:", data);

        // Lưu JWT và tên người dùng vào localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('name', data.name);

        setSuccessMessage("Đăng nhập thành công!");
        navigate("/"); // Điều hướng về trang chủ sau khi đăng nhập thành công
      } catch (error) {
        if (error.response) {
          setErrorMessage('Đăng nhập thất bại: ' + error.response.data.message);
          console.error("Lỗi đăng nhập:", error.response.data);
        } else {
          setErrorMessage('Đăng nhập thất bại. Vui lòng thử lại.');
          console.error("Lỗi đăng nhập:", error);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <div className="authentication-wrapper authentication-cover">
        <div className="authentication-inner row m-0">
          <div className="d-none d-lg-flex col-lg-7 col-xl-8 align-items-center p-5">
            <div className="w-100 d-flex justify-content-center">
              <img
                src="/assets/img/boy-with-rocket-light.png"
                className="img-fluid"
                alt="Login image"
                width={700}
              />
            </div>
          </div>
          <div className="d-flex col-12 col-lg-5 col-xl-4 align-items-center authentication-bg p-sm-12 p-6">
            <div className="w-px-400 mx-auto mt-12 pt-5">
              <h4 className="mb-1">Welcome to sneat! 👋</h4>
              <form id="formAuthentication" className="mb-6" onSubmit={handleLoginSubmit}>
                <div className="mb-6">
                  <label htmlFor="email" className="form-label">
                    Email hoặc Tên đăng nhập
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    placeholder="Nhập email hoặc tên đăng nhập"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  />
                  {loginErrors.email && <p style={{ color: 'red' }}>{loginErrors.email}</p>}
                </div>
                <div className="mb-6 form-password-toggle">
                  <label className="form-label" htmlFor="password">
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="············"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  />
                  {loginErrors.password && <p style={{ color: 'red' }}>{loginErrors.password}</p>}
                </div>
                <button className="btn btn-primary d-grid w-100" disabled={isLoading}>
                  {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
