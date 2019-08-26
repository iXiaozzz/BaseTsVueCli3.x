import request from '@/utils/request'
let test: string = '/api'
const baseUrl: string = process.env.NODE_ENV === 'development' ? test : '/api'

const api: object = {
  /**
   * 登录-验证码
   * @param params
   */
  getVerifycode(params: object) {
    return request(baseUrl + '/login/verifycode', params)
  },

  /**
   * 加盟商-注册接口
   * @param params
   */
  register(params: object) {
    return request(baseUrl + '/register', params)
  },

  /**
   * 加盟商-登录接口
   * @param params
   */
  login(params: object) {
    return request(baseUrl + '/login/login', params)
  },

  /**
   * 加盟商-设置密码
   * @param params
   */
  password(params: object) {
    return request(baseUrl + '/app/customer/setPassword', params)
  },

  /**
   * 上传图片
   */
  upload(params: object) {
    return request(baseUrl + '/audit/uploadImg', params, 'post', true)
  },
  // 查询学员资料
  getCustomerInfoByCusId(params: object) {
    return request(baseUrl + '/customer/getCustomerInfoByCusId', params, 'get')
  },
  // 获取省市列表
  getAreaList(params: object) {
    return request(baseUrl + '/area/areaList', params, 'get')
  },
  // 上传文件
  uploadFile(params: object) {
    return request(
      baseUrl + '/customer/uploadCertificate',
      params,
      'post',
      true
    )
  },
  // 修改学员资料
  editSaveCustomerMsg(params: object) {
    return request(baseUrl + '/customer/editSaveCustomer', params, 'post')
  },
  /**
   * 获取用户信息
   * @params
   */
  requestUserInfo(params: object = {}) {
    return request(baseUrl + '/app/customer/getCustomerInfo', params, 'get')
  },
  /**
   * 考试中心
   * 获取考试列表
   * @param customerId
   * @param pageNum
   * @param pageSize
   */
  requestTestList(params: object) {
    return request(
      baseUrl + '/test/getCustomerPaperByCustomerId',
      params,
      'get'
    )
  },
  /**
   * 开始考试
   * 获取考试信息
   *@param customerId
   *@param testPaperId
   */
  requestTestPaperInfo(params: object) {
    return request(baseUrl + '/test/getCustomerPaperDetail', params, 'get')
  },
  /**
   * 做题
   * 获取题目
   * @param testPaperId
   */
  requestQuestionList(params: object) {
    return request(baseUrl + '/test/getQuestion', params, 'post')
  },
  /**
   * 提交试卷
   * @param testPaperId
   * @param customerId
   * @param submitTestQuestionDtoList
   * @param submitTestQuestionDtoList  [{testQuestionId:'',testQuestionOptions:[]}]
   */
  submitPaper(params: object) {
    return request(baseUrl + '/test/submitPaper', params, 'post', true)
  }
}
export default api
