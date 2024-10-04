import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
export default function RegisterBox() {
    const [name, setName] = useState(""); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault(); // Ngăn chặn reload trang

        // Kiểm tra xem mật khẩu có khớp không
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("https://projectky320240926105522.azurewebsites.net/api/Auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }), // Gửi name thay vì username
            });

            if (!response.ok) {
                const errorText = await response.text(); // Nhận thông điệp lỗi dưới dạng văn bản
                if (errorText.includes("already exists")) {
                    setError("The account already exists."); // Thông báo khi tài khoản đã tồn tại
                } else {
                    setError(errorText); // Cập nhật trạng thái lỗi với thông điệp từ API
                }
                return;
            }
            
    
           
            navigate("/login"); // Điều hướng về trang chủ sau khi đăng nhập thành công
            // Nếu đăng ký thành công, bạn có thể điều hướng hoặc thực hiện hành động khác
            // Ví dụ: window.location.href = "/login";
        } catch (error) {
            console.error("Error:", error);
            setError("An error occurred during registration");
        }
    };

    return (
        <section className="login_box_area section_gap">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="login_form_inner">
                            <h3>Create an Account</h3>
                            {error && <p className="error-message">{error}</p>} {/* Hiển thị thông báo lỗi */}
                            <form className="row login_form" onSubmit={handleSubmit} id="contactForm" noValidate>
                                <div className="col-md-12 form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="RegName"
                                        name="RegName"
                                        placeholder="Name" // Thay đổi placeholder thành "Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)} // Cập nhật state name
                                        required // Bắt buộc nhập tên
                                    />
                                </div>
                                <div className="col-md-12 form-group">
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="RegEmail"
                                        name="RegEmail"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-md-12 form-group">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="RegPassword"
                                        name="RegPassword"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-md-12 form-group">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="RegConfirmPassword"
                                        name="RegConfirmPassword"
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-md-12 form-group">
                                    <button type="submit" className="primary-btn">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="login_box_img">
                            <img className="img-fluid" src="img/login.jpg" alt="" />
                            <div className="hover">
                                <h4>Already have an account? Login here</h4>
                                <p>There are advances being made in science and technology every day, and a good example of this is the</p>
                                <Link className="primary-btn" to="/login">Login to Account</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
