<template>
  <div class="app-container testStart-container">
    <van-nav-bar title="考试" left-arrow @click-left="goBack" />
    <div class="main-container">
      <div class="content-container">
        <div class="note note-top" ref="noteTop">
          <div class="note-top-box">
            <img class="icon-img" v-if="iconPath" :src="iconPath" alt="icon" />
            <h3>{{ paperInfo.testPaperName }}</h3>
            <div class="max-score">
              <p class="title">最高得分</p>
              <p class="score">{{ paperInfo.bestTestScore/10 || 0 }}</p>
            </div>
            <div class="max-score">
              <p class="title">剩余考试次数</p>
              <p class="score">{{ paperInfo.notDoneTestNum || 0 }}</p>
            </div>
            <div class="time-box">
              <p class="title">考试时间</p>
              <p class="time">{{ paperInfo.testStartTime }}</p>
              <p class="blank">&nbsp;</p>
              <p class="time">{{ paperInfo.testEndTime }}</p>
            </div>
          </div>
        </div>
        <div class="note note2" :style="{ height: noteTopHight + 'px' }"></div>
        <div class="note note3" :style="{ height: noteTopHight + 'px' }"></div>
      </div>
      <div class="footer-container" v-if="errMsg === ''">
        <div class="tip">考试次数有限，请认真对待</div>
        <div class="btn-container">
          <van-button plain round size="large" class="aihua-btn" @click="startTest">开始考试</van-button>
        </div>
      </div>
      <div class="footer-container" v-else>
        <div class="tip">{{ errMsg }}</div>
        <div class="btn-container">
          <van-button disabled round size="large" class="aihua-btn testEnd">开始考试</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator"; // 需要引入watch emit
import { NavBar, Button } from "vant";
import Api from "@/api/";
const testPass: string = require("@/assets/images/testPass@2x.png");
const testFail: string = require("@/assets/images/testFail@2x.png");
const testUnJoin: string = require("@/assets/images/testUnJion@2x.png");
interface queryForm {
  customerId: number;
  testPaperId: number;
}
@Component({
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button
  }
})
export default class TestStart extends Vue {
  /** data*/
  private icon: any = {
    testPass: testPass,
    testFail: testFail,
    testUnJoin: testUnJoin
  };
  private queryForm: queryForm = {
    customerId: +this.$utils.getLocalstorageStore("userId"),
    testPaperId: -1
  };

  private paperInfo: any = {};
  private iconPath: string = "";
  private errMsg: string = "";
  private errMsgs: Array<string> = [
    "考试次数已用尽",
    "考试时间已结束",
    "考试时间还未开始"
  ];
  private noteTopHight: string = "";
  @Watch("paperInfo")
  private watchPaperInfo() {}
  /**created */
  private created() {
    this.init();
  }
  /**methods */
  private async init() {
    this.queryForm.testPaperId = +this.$route.query.testPaperId;
    let [err, result] = await this.$utils.errorCaptured(
      this.requestTestPaperInfo
    );
    if (err) throw new Error(err);
    let data = result.data;
    data.testStartTime = data.testStartTime.replace(/-/g, "/");
    data.testEndTime = data.testEndTime.replace(/-/g, "/");
    this.paperInfo = result.data;
    this.$nextTick(() => {
      let oNoteTop: any = this.$refs.noteTop;
      this.noteTopHight = oNoteTop.getBoundingClientRect().height;
    });
    switch (this.paperInfo.testStatus) {
      case 2:
        this.iconPath = this.icon.testPass;
        break;
      case 3:
        this.iconPath = this.icon.testFail;
        break;
      case 4:
        this.iconPath = this.icon.testUnJoin;
        break;
      default:
        this.iconPath = "";
        break;
    }
    // this.iconPath = this.paperInfo.testStatus === 1 ? '' : this.paperInfo.testStatus === 2 ? this.icon.testPass : this.icon.testFail
    if (this.paperInfo.notDoneTestNum < 1) {
      this.paperInfo.notDoneTestNum = 0;
      this.errMsg = this.errMsgs[0];
    }
    if (this.errMsg) return;
    let testEndTime = new Date(
      this.$utils.changeTimeStr(this.paperInfo.testEndTime)
    ).getTime();
    let currentTime = new Date().getTime();
    if (testEndTime - currentTime < 0) {
      this.errMsg = this.errMsgs[1];
    }
    let testStartTime = new Date(
      this.$utils.changeTimeStr(this.paperInfo.testStartTime)
    ).getTime();
    if (currentTime - testStartTime < 0) {
      this.errMsg = this.errMsgs[2];
    }
  }
  private requestTestPaperInfo() {
    return Api.requestTestPaperInfo(this.queryForm);
  }
  private startTest() {
    if (!this.errMsg) {
      let obj: Object = {
        path: "/testing",
        query: { testPaperId: this.queryForm.testPaperId }
      };
      this.$router.push(obj);
    }
  }
  private goBack() {
    this.$router.go(-1);
  }
}
</script>

<style lang="less" scoped>
@import "../../style/index";
@bgColor: #f5f5f5;
@fc999: #999999;
@fc333: #333333;
.testStart-container {
  text-align: left;
  .main-container {
    .flex-num(1);
    .flex-v;
    padding: 0.32rem 0.32rem 0;
    background-color: @bgColor;
    .content-container {
      .flex-num(1);
      position: relative;
      .note {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin: auto;
        // min-height: 82%;
        border-radius: 0.2rem;
        background-color: #fff;
        box-shadow: 0px 0.2rem 0.6rem rgba(0, 0, 0, 0.1);
      }
      .note-top {
        width: 100%;
        padding: 0.64rem 0.96rem 0.6rem;
        z-index: 100;
        .note-top-box {
          position: relative;
          height: 100%;
          width: 100%;
        }
        h3 {
          .font-c(48, @second-color);
          .text-more-ellipsis(3);
          line-height: 0.6rem;
        }
        .icon-img {
          position: absolute;
          top: 0;
          right: -0.54rem;
          width: 2rem;
          height: 2rem;
          z-index: 101;
        }
        .max-score {
          width: 2.2rem;
          padding: 0.48rem 0 0.32rem;
          border-bottom: 0.02rem dashed @fc999;
          font-family: "Alternate Bold";
          .title {
            .font-c(28, #666666);
          }
          .score {
            .font-c(60, @fc333);
            margin-top: 0.16rem;
            font-weight: bold;
            font-family: "Alternate Bold";
          }
        }
        .time-box {
          width: 100%;
          padding: 0.48rem 0 0.32rem;
          .title {
            .font-c(28, #666666);
            margin-bottom: 0.2rem;
          }
          .time {
            .font-c(32, @fc333);
            font-weight: bold;
            font-family: "Alternate Bold";
          }
          .blank {
            height: 0.3rem;
            border-left: 0.02rem solid @fc999;
            margin: 0.08rem 0;
          }
        }
      }
      .note2 {
        top: 0.28rem;
        width: 90%;
        z-index: 99;
      }
      .note3 {
        top: 0.56rem;
        width: 80%;
        z-index: 98;
      }
    }
    .footer-container {
      // height: 2.1rem;

      .tip {
        .font-c(28, @fc999);
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: center;
      }

      .btn-container {
        height: 1.2rem;
        .aihua-btn {
          .font-c(36, #fff);
          height: 0.88rem;
          line-height: 0.88rem;
          border: 0;
        }
      }
      .testEnd {
        background-color: #cccccc !important;
      }
    }
  }
}
</style>
