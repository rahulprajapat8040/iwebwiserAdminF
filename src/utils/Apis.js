// const BaseUrl = "https://b5123341-8001.inc1.devtunnels.ms/api/v1";
// const BaseUrl = "http://213.210.21.175:8001/api/v1";
const BaseUrl = "http://localhost:8001/api/v1";

export const Apis = {
  // admin apis
  login: `${BaseUrl}/admin/login`, // login
  RequestPasswordReset: `${BaseUrl}/admin/request-reset`, // request password reset
  ResetPassword: `${BaseUrl}/admin/reset`, // reset password
  getAdmin: `${BaseUrl}/admin/getUser`, // get admin
  updateAdmin: `${BaseUrl}/admin/updataUser`, // update admin
  updateProfilepic: `${BaseUrl}/admin/updateProfilePic`, // update profile pic

  // UPLOAD IMAGE OR VIDEO APIS
  uploadFile: `${BaseUrl}/image/imageUploader`,

  // BANNER APIS START
  createBanner: `${BaseUrl}/banner/createBanner`, // create banner
  getAllBanner: `${BaseUrl}/banner/getAllBanner`, // get all banners
  updateBanner: `${BaseUrl}/banner/updataBanner`, // update banner
  deleteBanner: `${BaseUrl}/banner/deleteBanner`, // delete banner

  // CLIENT APIS START
  createClient: `${BaseUrl}/ourClient/createOurClient`, // create client
  getAllClient: `${BaseUrl}/ourClient/getAllOurClient`, // get all client
  updateClient: `${BaseUrl}/ourClient/updataOurClient`, // update client
  deleteClient: `${BaseUrl}/ourClient/deleteOurClient`, // delete client
  searchClient: `${BaseUrl}/ourClient/searchOurClient`, // search client

  // SERVICE APIS START
  createService: `${BaseUrl}/service/createService`, // create service
  getAllServices: `${BaseUrl}/service/getAllService`, // get all service
  getAllServicesFull: `${BaseUrl}/service/getAllService?showAll=true`, // get all services with showAll=true
  updateService: `${BaseUrl}/service/updataService`, // update service
  deleteService: `${BaseUrl}/service/deleteService`, // delete service
  searchService: `${BaseUrl}/service/searchServiceByTitle`, // search service

  // SUB-SERVICE APIS START
  createSubService: `${BaseUrl}/subService/createSubService`, // create sub-service
  getAllSubService: `${BaseUrl}/subService/getAllSubService`, // get all sub-service
  searchSubService: `${BaseUrl}/subService/searchByTitle`, // serach subservice
  updateSubService: `${BaseUrl}/subService/updataSubService`, // update sub-service
  deleteSubService: `${BaseUrl}/subService/deleteSubService`, // delete sub-service

  // SERVICE FAQ API START
  createServiceFaq: `${BaseUrl}/serviceFaq/createServiceFaq`, // create service-faq
  getAllServiceFaq: `${BaseUrl}/serviceFaq/getAllServiceFaq`, // get all service-faq
  updateServiceFaq: `${BaseUrl}/serviceFaq/updataServiceFaq`, // update service-faq 
  deleteServiceFaq: `${BaseUrl}/serviceFaq/deleteServiceFaq`, // delete service-faq
  searchServiceFaq: `${BaseUrl}/serviceFaq/serarchServiceFaq`, // search service-faq

  // INDUSTRY APIS START
  createIndustry: `${BaseUrl}/industry/createIndustry`, // create industry
  getAllIndustry: `${BaseUrl}/industry/getAllIndustry`, // get all industries
  updateIndustry: `${BaseUrl}/industry/updataIndustry`, // update industry
  deleteIndustry: `${BaseUrl}/industry/deleteIndustry`, // delete industry
  searchIndustry: `${BaseUrl}/industry/searchIndustryByTitle`, // search industry
  getAllIndustryFull: `${BaseUrl}/industry/getAllIndustry?showAll=true`, // get all industries

  // BLOG APIS START
  createBlog: `${BaseUrl}/blog/createBlog`, // create blog'
  getAllBlog: `${BaseUrl}/blog/getAllBlog`, // get all blog
  updateBlog: `${BaseUrl}/blog/updataBlog`, // update blog
  deleteBlog: `${BaseUrl}/blog/deleteBlog`, // delete blog

  // ADD CERTIFICATE APIS START
  createCertificate: `${BaseUrl}/certificate/createCertificate`, // create certificate
  getAllCertificate: `${BaseUrl}/certificate/getAllCertificate`, // get all certificate
  updateCertificate: `${BaseUrl}/certificate/updataCertificate`, // update certificate
  deleteCertificate: `${BaseUrl}/certificate/deleteCertificate`, // delete certificate

  // TECHNOLOGY APIS START
  createTechnology: `${BaseUrl}/technology/createtechnology`, // create technology
  getAllTechnology: `${BaseUrl}/technology/getAllTechnology`, // get all technology
  updateTechnology: `${BaseUrl}/technology/updataTechnology`, // update technology
  deleteTechnology: `${BaseUrl}/technology/deleteTechnology`, // delete technology
  searchTechnology: `${BaseUrl}/technology/searchtechnology`, // search technology

  // CASE STUDY APIS START

  addCase: `${BaseUrl}/caseStudy/createCaseStudy`, // add case study
  getAllCaseStudy: `${BaseUrl}/caseStudy/getAllCaseStudy`, // get all case study
  getCaseStudyById: `${BaseUrl}/caseStudy/getCaseStudy`, // get case study by id
  updateCaseStudy: `${BaseUrl}/caseStudy/updataCaseStudy`, // update case study
  deleteCaseStudy: `${BaseUrl}/caseStudy/deleteCaseStudy`, // delete case study
  // navbar apis
  createHeader: `${BaseUrl}/header/createHeader`, // create header
  getAllHeader: `${BaseUrl}/header/getAllHeader`, // get all header
  updateHeader: `${BaseUrl}/header/updataHeader`, // update header
  deleteHeader: `${BaseUrl}/header/deleteHeader`, // delete header
  // section apis
  createSection: `${BaseUrl}/content/sectionCreate`, // create section
  createSectionContent: `${BaseUrl}/content/sectionHeading`, // create section content
  createSectionMedia: `${BaseUrl}/content/sectionMedia`, // create section media
  getSectionById: `${BaseUrl}/content/getSectionById`, // get section by navbar, sublink, submenu, own id
  getAllSection: `${BaseUrl}/content/getAllSections`, // get all sections
  createSectionList: `${BaseUrl}/content/sectionlists`, // create section list
  deleteSection: `${BaseUrl}/content/delete`,
  // MEDIA UPLOAD

  uploadMedia: `${BaseUrl}/content/imageuploader`, // upload media

  // BRANCH APIS
  createBranch: `${BaseUrl}/branch/createBranch `, // create branch
  getAllBranch: `${BaseUrl}/branch/getAllBranch`, // get all branch
  updateBranch: `${BaseUrl}/branch/updataBranch`, // update branch
  deleteBranch: `${BaseUrl}/branch/deleteBranch`, // delete branch
  searchBranch: `${BaseUrl}/branch/searchBranch`, // search branch

  // FEEDBACK APIS
  addFeedback: `${BaseUrl}/feedback/createFeedback`, // add feedback
  getAllFeedback: `${BaseUrl}/feedback/getAllFeedback`, // get all feedback
  updateFeedback: `${BaseUrl}/feedback/updataFeedback`, // update feedback
  deleteFeedback: `${BaseUrl}/feedback/deleteFeedback`, // delete feedback
  searchFeedback: `${BaseUrl}/feedback/searchFeedback`, // search feedback

  // SOCIAL MEDIA APIS
  getAllSocialMedia: `${BaseUrl}/socialMedia/getAllSocialMedia`, // get all social media
  deleteSocialLink: `${BaseUrl}/socialMedia/deletesocialMedia`, // delete social media
  searchSocialMedia: `${BaseUrl}/socialMedia/searchSoicalMedia`, // search social media
  updateSocialMedia: `${BaseUrl}/socialMedia/updataSocialMedia`, // update social media
};
