// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Homes from "@material-ui/icons/Home";
import Person from "@material-ui/icons/Person";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Register from "@material-ui/icons/GroupAdd";
import Login from "@material-ui/icons/LockOpen";
import Car from "@material-ui/icons/LocalTaxi";
import Shop from "@material-ui/icons/LocalGroceryStore";
import Note from "@material-ui/icons/NoteAdd";
import List from "@material-ui/icons/ListAlt";
import GroupIcon from "@material-ui/icons/Group";


// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
//import Histogrammecar from "views/Dashboard/Histogrammecar.jsx";
import TableProfile from "views/TableProfile/TableProfile.jsx";
import ShowProfile from "views/TableProfile/ShowProfile.jsx";
import Showreservation from "views/Reservation/Showreservation.jsx";
import tablereservation from "views/Reservation/tablereservation.jsx";
import UserList from "views/UserList/UserList.jsx";
import Userregister from "views/UserList/Userregister.jsx";
import Clients from "views/UserList/Clients.jsx";
import Prestataire from "views/UserList/Prestataire.jsx";
import Cars from "views/Cars/Cars.jsx";
import Carshow from "views/Cars/Carshow.jsx";
import updatcar from "views/Cars/updatcar.jsx";
import Reservation from "views/Reservation/Reservation.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import  Reservationregister from "views/Reservation/Reservationregister.jsx";
import  History from "views/History/History.jsx";
import  UpdateHistory from "views/History/UpdateHistory.jsx";
import  Statut from "views/Statut/Statut.jsx";
import  UpdateStatut from "views/Statut/UpdateStatut.jsx";
import  StatutRegister from "views/Statut/StatutRegister.jsx";
import  Mark from "views/Mark/Mark.jsx";
import  UpdateMark from "views/Mark/UpdateMark.jsx";
import  MarkRegister from "views/Mark/MarkRegister.jsx";
import  Carmodel from "views/Carmodel/Carmodel.jsx";
import  CarmodelRegister from "views/Carmodel/CarmodelRegister.jsx";  
 import MapContainer from "views/MapContainer/MapContainer.jsx";

 import SearchLocationInput from "components/SearchLocationInput/SearchLocationInput.jsx";



// core components/views for Auth layout
import LoginPage from "views/Pages/LoginPage.jsx";
//import RegisterPage from "views/Pages/RegisterPage.jsx";
import Carsregister from "views/Cars/Carsregister.jsx";
import select from "select";

const dashboardRoutes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        rtlName: "لوحة القيادة",
        icon: Dashboard,
        component: DashboardPage,
        layout: "/admin",
        displaySidebar: true,
    },
   
    {
        path: "/Table/:id",
        name: "Table Profile",
        rtlName: "ملف تعريفي للمستخدم",
        icon: Person,
        component: TableProfile,
        layout: "/admin",
        displaySidebar: false,
    },
    {
        path: "/Show/:id",
        name: "",
        rtlName: "",
        icon: Person,
        component: ShowProfile,
        layout: "/admin",
        displaySidebar: false,
    },
    {
        path: "/Showreservation/:id",
        name: "",
        rtlName: "",
        icon: Person,
        component: Showreservation,
        layout: "/admin",
        displaySidebar: false,
    },
    {
        path: "/Carshow",
        name: "",
        rtlName: "",
        icon: Person,
        component: Carshow,
        layout: "/admin",
        displaySidebar: false,
    },
    {
        path: "/UpdateStatut",
        name: "UpdateStatut",
        rtlName: "",
        icon: Person,
        component: UpdateStatut,
        layout: "/admin",
        displaySidebar: false,
    },
    {
        path: "/UpdateMark",
        name: "UpdateMark",
        rtlName: "",
        icon: Person,
        component: UpdateMark,
        layout: "/admin",
        displaySidebar: false,
    },
    {
        path: "/updatcar",
        name: "updatcar",
        rtlName: "",
        icon: Person,
        component: updatcar,
        layout: "/admin",
        displaySidebar: false,
    },
    {
        path: "/UpdateHistory",
        name: "UpdateHistory",
        rtlName: "",
        icon: Person,
        component: UpdateHistory,
        layout: "/admin",
        displaySidebar: false,
    },
    {
        path: "/tablereservation",
        name: "",
        rtlName: "",
        icon: Person,
        component: tablereservation,
        layout: "/admin",
        displaySidebar: false,
    },
    {
        path: "/user/list",
        name: "Utilisateurs",
        rtlName: "قائمة الجدول",
        icon: GroupIcon,
        component: UserList,
        layout: "/admin",
        displaySidebar: true,
    },
    {
        path: "/Prestataire",
        name: "Prestataire",
        rtlName: "قائمة الجدول",
        icon: Person,
        component: Prestataire,
        layout: "/admin",
        displaySidebar: true,
    },
    {
        path: "/Clients",
        name: "Clients",
        rtlName: "قائمة الجدول",
        icon: Person,
        component: Clients,
        layout: "/admin",
        displaySidebar: true,
    },
                

    {
        path: "/car",
        name: "Voitures",
        rtlName: "قائمة الجدول",
        icon: Car,
        component: Cars,
        layout: "/admin",
        displaySidebar: true,
    },
    {
        path: "/reservationregister",
        name: "Reservationregister",
        rtlName: "قائمة الجدول",
        icon: Car,
        component: Reservationregister,
        layout: "/admin",
        displaySidebar: false,
    },
    {
        path: "/StatutRegister",
        name: "StatutRegister",
        rtlName: "قائمة الجدول",
        icon: Car,
        component: StatutRegister,
        layout: "/admin",
        displaySidebar: false,
    },
    {
        path: "/Carsregister",
        name: "Carsregister",
        rtlName: "قائمة الجدول",
        icon: Car,
        component: Carsregister,
        layout: "/admin",
        displaySidebar: false,
    },

    {
        path: "/Userregister",
        name: "Userregister",
        rtlName: "قائمة الجدول",
        icon: Car,
        component: Userregister,
        layout: "/admin",
        displaySidebar: false,
    },
    {
        path: "/Reservation",
        name: "Reservations",
        rtlName: " قائمة الحجز",
        icon: Shop,
        component: Reservation,
        layout: "/admin",
        displaySidebar: true,
    },
    {
        path: "/History",
        name: "Historique",
        rtlName: " قائمة الحجز",
        icon: List,
        component: History,
        layout: "/admin",
        displaySidebar: true,
    },
    {
        path: "/Mark",
        name: "Marques de voiture",
        rtlName: " قائمة الحجز",
        icon: "content_paste",
        component: Mark,
        layout: "/admin",
        displaySidebar: true,
    },
    {
        path: "/MarkRegister",
        name: "Marques de voiture",
        rtlName: " قائمة الحجز",
        icon: "content_paste",
        component: MarkRegister,
        layout: "/admin",
        displaySidebar: false,
    },
    {
        path: "/Statut",
        name: "Statut",
        rtlName: " قائمة الحجز",
        icon: Note,
        component: Statut,
        layout: "/admin",
        displaySidebar: true,
    },
    {
        path: "/Carmodel",
        name: "Modèles de voiture",
        rtlName: " قائمة الحجز",
        icon: "content_paste",
        component: Carmodel,
        layout: "/admin",
        displaySidebar: true,
    },

    {
        path: "/MapContainer",
        name: "MapContainer",
        rtlName: "خرائط",
        icon: LocationOn,
        component: MapContainer,
        layout: "/admin",
        displaySidebar: true,
    },
    {
        path: "/SearchLocationInput",
        name: "SearchLocationInput",
        rtlName: "خرائط",
        icon: LocationOn,
        component: SearchLocationInput,
        layout: "/admin",
        displaySidebar: false,
    },
    {
        path: "/notifications",
        name: "Notifications",
        rtlName: "إخطارات",
        icon: Notifications,
        component: NotificationsPage,
        layout: "/admin",
        displaySidebar: false,
    },
  
    {
        path: "/login-page",
        name: "Login Page",
        rtlName: "پشتیبانی از راست به چپ",
        icon: Login,
        component: LoginPage,
        layout: "/auth",
        displaySidebar: false,
    },
    // {
    //     path: "/register-page",
    //     name: "Register Page",
    //     rtlName: "پشتیبانی از راست به چپ",
    //     icon: Register,
    //     component: RegisterPage,
    //     layout: "/auth",
    //     displaySidebar: true,
    // },
    {
        path: "/CarmodelRegister",
        name: "CarmodelRegister",
        rtlName: "پشتیبانی از راست به چپ",
        icon: Register,
        component: CarmodelRegister,
        layout: "/admin",
        displaySidebar: false,
    },

    //histogramme 
    // {
    //     path: "/Histogrammecar",
    //     name: "Histogramme",
    //     rtlName: "پشتیبانی از راست به چپ",
    //     icon: Register,
    //     component: Histogrammecar,
    //     layout: "/admin",
    //     displaySidebar: true,
    // },
];

export default dashboardRoutes;
