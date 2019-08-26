<template>
  <div class="testCenter-container">
    <van-nav-bar title="爱华考试中心" fixed />
    <div class="main-container" :style="{ 'min-height': mainContainerH }">
      <div class="info-container">
        <div class="user-head">
          <div class="head-img">
            <img v-if="userInfo.headImg" :src="userInfo.headImg" alt="头像" />
            <img v-else src="../../assets/images/default_user@3x.png" alt="头像" />
          </div>
        </div>
        <div class="user-info">
          <h3 class="user-name">{{ userInfo.customerName }}</h3>
        </div>
        <div class="to-personal">
          <router-link to="/personalInfo">个人信息</router-link>
        </div>
      </div>
      <div class="test-record" v-if="dataLength">
        <div class="title-box">
          <img src="../../assets/images/icon_test_title.svg" alt />
          <span class="title-name">我的考试</span>
        </div>

        <div class="record-list">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getData">
            <div
              class="list-item"
              v-for="(data, index) in dataList"
              :key="index"
              @click.stop="joinTest(data.testPaperId)"
            >
              <div class="test-info">
                <div class="left">{{ data.testPaperName }}</div>
                <div class="right wait" v-if="data.testStatus === 1">
                  {{ testType[data.testStatus] }}
                  <van-icon name="arrow" class="icon" />
                </div>
                <div class="right pass" v-else-if="data.testStatus === 2">
                  {{ testType[data.testStatus] }}
                  <van-icon name="arrow" class="icon" />
                </div>
                <div class="right fail" v-else>
                  {{ testType[data.testStatus] }}
                  <van-icon name="arrow" class="icon" />
                </div>
              </div>
              <!-- <div class="time-info">2019/06/22 09:00 ~ 2019/09/22 09:00</div> -->
              <div class="time-info">{{ data.testStartTime }}~{{ data.testEndTime }}</div>
              <div class="test-num">剩余考试次数：{{ data.notDoneTestNum }}</div>
            </div>
          </van-list>
        </div>
      </div>
      <div class="empty-container" v-else>
        <div class="img-box">
          <img src="../../assets/images/pic_wurenwu@2x.png" alt />
          <p>您还没有考试安排哦~</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator"; // 需要引入watch emit
import { NavBar, Icon, Popup, List } from "vant";
import Api from "@/api/";
import Utils from "@/utils/";
// 用户信息接口
interface userInfo {
  headImg: string;
}
// 请求的参数接口
interface queryForm {
  customerId: string;
  pageNum: number;
  pageSize: number;
}
@Component({
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    [List.name]: List
  }
})
export default class TestCenter extends Vue {
  /** data*/
  private loading: boolean = false;
  private finished: boolean = false;
  private winH: number = 0;
  private mainContainerH: string = "";
  private dataList: Array<object> = [];
  private testType: Array<string> = ["", "待考试", "已通过", "未通过", "缺考"];
  private userInfo: userInfo = {
    headImg: ""
  };
  private queryForm: queryForm = {
    customerId: "20340",
    pageNum: 1,
    pageSize: 1000
  };
  /**computed */
  private get headImgStyleStr(): string {
    return `url("${this.userInfo.headImg}") no-repeat center center/cover;`;
  }
  private get dataLength(): number {
    return this.dataList.length;
  }

  /**watch eg */
  @Watch("loading")
  private watchLoading(newV: boolean, oldV: boolean): void {
    console.log(newV);
  }
  /**created */
  private created() {
    this.winH = Utils.getWindowHeight();
    this.mainContainerH = `${this.winH - 47}px`;
    this.init();
  }
  /**mounted */
  private mounted() {
    this.getData();
  }
  /**methods */
  public async init() {
    let [err, result] = await Utils.errorCaptured(this.requestUserInfo);
    if (err) throw new Error(err);
    this.userInfo = result.data.data;
    Utils.setLocalstorageStore("userInfo", this.userInfo);
  }
  public async getData() {
    this.loading = true;
    let [err, result] = await Utils.errorCaptured(this.requestTestList);
    this.loading = false;
    if (err) throw new Error(err);
    result = result.data.rows;
    if (!result.length) {
      this.finished = true;
      return;
    }
    this.dataList = [...this.dataList, ...result];
    this.queryForm.pageNum++;
  }
  private requestTestList() {
    return Api.requestTestList(this.queryForm);
  }
  private requestUserInfo() {
    return Api.requestUserInfo();
  }
  public joinTest(testPaperId) {
    this.$router.push({
      path: "/testStart",
      query: { testPaperId: testPaperId }
    });
  }
}
</script>

<style lang="less" scoped>
@import "../../style/index";
@paddingHorizontal: 0.32rem;
@fc333: #333333;
.testCenter-container {
  text-align: left;
  img {
    width: 100%;
    max-width: 100%;
  }
  .wait {
    color: @second-color;
  }
  .pass {
    color: #4cd19f;
  }
  .fail {
    color: #999999;
  }
  .main-container {
    .flex-v;
    height: 100%;
    margin-top: 47px;
    // overflow-y: scroll;
  }
  .info-container {
    .flex-center-start;
    flex-direction: row;
    height: 2.24rem;
    background-color: #ffffff;
    padding: 0 @paddingHorizontal;
    border-bottom: 0.02rem solid #e6e6e6;
    background: url("../../assets/images/test_center_info_bg@2x.png") no-repeat
      center center/cover;
    .user-head {
      .flex(center, center);
      width: 1.66rem;

      .head-img {
        width: 1.28rem;
        height: 1.28rem;
        border-radius: 50%;
        border: 0.04rem solid #fff;
        overflow: hidden;
        background-color: #ffffff;
        img {
          width: 100%;
          max-width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }

    .user-head,
    .user-info {
      height: 1.66rem;
    }

    .user-info {
      .flex-num(1);
      .flex-v;
      justify-content: center;
      padding-left: 0.24rem;

      .user-name {
        .font-c(40, #333333);
        font-weight: bold;
        text-align: left;
      }

      .level-img {
        width: 2.14rem;
        height: 0.44rem;
      }
    }

    .to-personal {
      // .flex-num(1);
      width: 1.6rem;
      height: 0.64rem;
      line-height: 0.64rem;
      border-radius: 0.32rem;
      border: 0.02rem solid @second-color;
      background-color: #ffffff;
      text-align: center;
      a {
        display: block;
        height: 100%;
        color: @second-color;
        border-radius: 16px;
      }
    }
  }
  .test-record {
    .flex-num(1);
    padding: 0 @paddingHorizontal;
    background-color: #f5f5f5;
    .title-box {
      .flex(flex-start, center);
      height: 1.24rem;
      line-height: 1.24rem;
      img {
        display: block;
        width: 0.4rem;
        height: 0.34rem;
      }
      .title-name {
        .font-c(32, @fc333);
        padding-left: 0.16rem;
        font-weight: bold;
        position: relative;
        bottom: -0.04rem;
      }
    }
    .record-list {
      .list-item {
        padding: 0.32rem;
        margin-bottom: 0.3rem;
        background-color: #fff;
        border-radius: 10px;
        & > div {
          height: 0.6rem;
          line-height: 0.6rem;
        }
        .test-info {
          .flex(flex-start, center);
          .left {
            .flex-num(3);
            .font-c(32, @fc333);
            font-weight: bold;
            line-height: 0.4rem;
          }
          .right {
            .flex-num(1);
            text-align: right;
            .icon {
              position: relative;
              bottom: -0.03rem;
            }
          }
        }
        .time-info {
          .font-c(24, #666666);
        }
        .test-num {
          .font-c(24, @fc333);
        }
      }
    }
  }
  .empty-container {
    .flex-num(1);
    .flex(center, center);
    // padding-top: 1.48rem;
    .img-box {
      width: 3.8rem;
      img {
        display: block;
        width: 3.52rem;
        height: 2.5rem;
      }
      p {
        padding: 0.4rem 0 0.08rem;
        .font-c(32, #666666);
        text-align: center;
      }
    }
  }
}
</style>
