import { configureStore } from "@reduxjs/toolkit";
import hideShowDrawerReducer from "./features/HideShowDrawer";
import { getAllLinkPagesReducer } from "./features/GetAllLinkPages";
import { getAllSubLinkPagesReducer } from "./features/GetAllLinkPages";
import { getAllNavItemsReducer } from "./features/GetAllLinkPages";
import { getAllSubChildLinkPagesReducer } from "./features/GetAllLinkPages";
import { getAllBannerReducer } from "./features/GetBanner";
import { getAllClientReducer } from "./features/GetClients";
import { getAllBlogReducer } from "./features/GetAllBlogs";
import { getAllTechnologyReducer } from "./features/GetAllTechnologies";
import { getAllServicesFullReducer, getAllServicesReducer } from "./features/GetAllServices";
import { getAllIndustryReducer } from "./features/GetAllIndustry";
import { getAllCertificatesReducer } from "./features/GetAllCertificates";
import { getAllFeedbackReducer } from "./features/GetAllFeddBack";
import { getAllHeaderReducer } from "./features/GetAllHeader";
import { getAllSocialMediaReducer } from "./features/GetAllSocialMedia";
import { getAllCaseStudyReducer } from "./features/GetAllCaseStudy";
import { getAllBranchReducer } from "./features/GetAllBranch";
import { adminReducer } from "./features/GetAdmin";
import { getAllSubServicesReducer } from "./features/GetAllSubServices";
import { getAllFaqReducer } from "./features/GetAllFaq";
export const store = configureStore({
  reducer: {
    hideShowDrawer: hideShowDrawerReducer,
    getAllLinkPages: getAllLinkPagesReducer,
    getAllSubLinkPages: getAllSubLinkPagesReducer,
    getAllNavItems: getAllNavItemsReducer,
    getAllSubChildLinkPages: getAllSubChildLinkPagesReducer,
    getAllBanner: getAllBannerReducer,
    getAllClient: getAllClientReducer,
    getAllBlog: getAllBlogReducer,
    getAllTechnology: getAllTechnologyReducer,
    getAllServices: getAllServicesReducer,
    getAllServicesFull: getAllServicesFullReducer,
    getAllFaq: getAllFaqReducer,
    getAllIndustry: getAllIndustryReducer,
    getAllCertificates: getAllCertificatesReducer,
    getAllFeedback: getAllFeedbackReducer,
    getAllHeader: getAllHeaderReducer,
    getAllSocialMedia: getAllSocialMediaReducer,
    getAllCaseStudy: getAllCaseStudyReducer,
    getAllBranch: getAllBranchReducer,
    getAllSubService: getAllSubServicesReducer,
    admin: adminReducer,
  },
});
