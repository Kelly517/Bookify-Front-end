import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UsersRegister from "./pages/UsersRegister.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import MyBooks from "./components/homecomponents/MyBooks.jsx";
import CodeVerificator from "./pages/CodeVerificator.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Read from "./components/sidebarcomponents/Read.jsx";
import Write from "./components/sidebarcomponents/Write.jsx";
import CreateNewBook from "./pages/CreateNewBook.jsx";
import WelcomePage from "./pages/WelcomePage.jsx";
import EditProfile from "./components/profilecomponents/EditProfile.jsx";
import BookDetail from "./pages/BookDetail.jsx";
import CreateChapter from "./pages/CreateChapter.jsx";
import WriteHome from "./components/sidebarcomponents/WriteHome.jsx";
import { AuthProvider } from "./assets/context/AuthContext.jsx";
import ProtectedRoute from "./components/registercomponents/ProtectedRoute.jsx";
import AdminHome from "./components/admincomponents/usercontrolpanel/AdminHome.jsx";
import ControlPanelUsers from "./components/admincomponents/usercontrolpanel/sidebaradmin/ControlPanelUsers.jsx";
import ControlPanelSales from "./components/admincomponents/usercontrolpanel/sidebaradmin/ControlPanelSales.jsx";
import AdminDashboard from "./components/admincomponents/usercontrolpanel/AdminDashboard.jsx";
import ReadChapter from "./components/bookdetail/ReadChapter.jsx";
import Checkout from "./pages/Checkout.jsx";
import EditChapter from "./pages/EditBookPage.jsx";
import Sales from "./pages/Sales.jsx";
import { BookProvider } from "./assets/context/BookContext.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import UpdatePassword from "./pages/UpdatePassword.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <BookProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/register" element={<UsersRegister />} />
              <Route path="/verification-code" element={<CodeVerificator />} />
              <Route path="login" element={<Login />} />
              <Route path="/forgot/password" element={<ForgotPasswordPage />} />
              <Route path="/update/password/:email" element={<UpdatePassword />} />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute allowedRoles={["USER"]}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Home />} />
                <Route path="profile" element={<MyProfile />} />
                <Route path="visit/profile/:email" element={<UserProfile />}/>
                <Route path="configuration" element={<EditProfile />} />

                <Route path="read" element={<Read />}></Route>
                <Route path="write" element={<Write />}>
                  <Route index element={<WriteHome />} />
                  <Route path="create" element={<CreateNewBook />} />
                  <Route
                    path="create-page/:bookIdentifierCode"
                    element={<CreateChapter />}
                  />
                  <Route
                    path="edit/page/:bookIdentifierCode"
                    element={<EditChapter />}
                  />
                </Route>
                <Route path="checkout" element={<Checkout />} />
                <Route path="sales" element={<Sales />} />

                <Route
                  path="read-book/:bookIdentifierCode"
                  element={<ReadChapter />}
                />
                <Route
                  path="book/:bookIdentifierCode"
                  element={<BookDetail />}
                />
              </Route>

              <Route
                path="/admin-dashboard"
                element={
                  <ProtectedRoute allowedRoles={["ADMIN"]}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminHome />} />
                <Route
                  path="control-panel/user"
                  element={<ControlPanelUsers />}
                />
                <Route
                  path="control-panel/sale"
                  element={<ControlPanelSales />}
                />
              </Route>

              <Route path="/my-books" element={<MyBooks />} />
            </Routes>
          </BrowserRouter>
        </BookProvider>
      </AuthProvider>
    </>
  );
}

export default App;
