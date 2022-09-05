<template>
  <div class="__home">

    <div class="__home_ctx">
      <div class="__header">
        <div class="__header_l">
          <a class="__header_l_link" href="/" target="_black">
            <img src="@/assets/img/twitter_icon.svg" alt="">
          </a>
          <a class="__header_l_link" href="https://t.me/BeefhotpotCN" target="_black">
            <img src="@/assets/img/telegram_icon.svg" alt="">
          </a>
          <!-- <a class="__header_l_link" href="https://bscscan.com/address/0x6f61bdbb296f0e70c5e529aa7cb0f08a5bb0811b#code" target="_black">
            <img src="@/assets/img/bsc_icon.svg" alt="">
          </a> -->
        </div>
        <div class="__header_c">
          <video @canplay="videoLoad" :style="{'opacity': isShowVideo ? '1' : '0'}" class="__home_video" playsinline controls="false" autoplay="autoplay" loop="loop" muted  src="https://cdn.dribbble.com/users/1420376/screenshots/17404582/media/578079bb92cc46bd001e1375be5603ff.mp4"></video>
        </div>
        <div class="__header_r" v-if="myAddress" @click="cutAdd">
          <span>{{ myAddress | showAdd }}</span>
        </div>
        <div class="__header_r" v-else @click="joinWeb3">
          <span>连接钱包</span>
        </div>
      </div>
      <div class="_egg_title">
        最简单最赚钱的区块链资金池
      </div>
      <div class="_egg_odds">
        <div class="_egg_odds_item" @click="progress">
          <img class="__odds_icon" src="@/assets/img/star.png" alt="">
          白皮书
        </div>
        <a class="_egg_odds_item" target="_black" @click="progress">
          <img class="__odds_icon" src="@/assets/img/kyc_icon.png" alt="">
          KYC 认证
        </a>
        <div class="_egg_odds_item"  @click="progress">
          <img class="__odds_icon" src="@/assets/img/security.png" alt="">
          安全审计
        </div>
      </div>
      <!-- <div class="start_project" @click="startProject()">开始</div>
      <div class="start_project" @click="postCoin('Acoin')">合约提取Acoin</div>
      <div class="start_project" @click="postCoin('Bcoin')">合约提取Bcoin</div>
      <div class="start_project" @click="postCoin('USDT')">合约提取USDT</div> -->
      <div class="_egg_body">
        <div class="_egg_body_left">
          <!-- <img class="_egg_info_icon" src="@/assets/img/egg.svg" alt=""> -->
          <div class="_egg_info_warp">
            <div class="_egg_info_ctx">
              <div class="_egg_info_tlt">
                收益计算表
              </div>
              <div class="_egg_info_item">
                日利率
                <span>20%</span>
              </div>
              <div class="_egg_info_item">
                年利率
                <span>7620%</span>
              </div>
              <div class="_egg_info_item">
                服务费
                <span>4%</span>
              </div>
            </div>
          </div>
          <div class="_egg_referral">
            <div class="_egg_referral_tlt">
              推广链接
            </div>
            <div class="_egg_referral_desc">
              你可以从任何使用你的邀请链接参与质押的玩家那里获取 20% 的USDT奖励
            </div>
            <div class="_egg_referral_ipt">
              <div class="_egg_referral_ipt_txt">
                {{ refLinks }}
              </div>
              <div class="_egg_referral_ipt_btn" id="copybuttons" @click="copyLink">
                复制
              </div>
            </div>
          </div>
        </div>
        <div class="_egg_body_right">
          <div class="_egg_body_r_item">
            合约 
              <span>{{ contractBalance | num2CurrencyNo }} Bcoin</span>
          </div>
          <div class="_egg_body_r_item">
            钱包  
              <div class="egg_blacne_token">
                <div>{{ myETHBalance | num2CurrencyNo  }} BNB</div>
                <div>{{ myUSDTBalance | num2CurrencyNo  }} USDT</div>
                <div>{{ myACoinBalance | num2CurrencyNo  }} Acoin</div>
                <div>{{ myBCoinBalance | num2CurrencyNo  }} Bcoin</div>
              </div>
          </div>
          <div class="_egg_body_r_item">
            总算力  <span>{{ myMiners }} MBcoin</span>
          </div>
          <div class="_egg_body_r_item">
            你的算力  <span>{{ myMiners }} MBcoin</span>
          </div>
          <div class="_egg_body_r_lp_warp">
            <div class="_egg_body_r_ant">
              <input type="text" class="_egg_body_r_ipt" v-model="buyAcoinNumber">
              <div class="_egg_body_r_ant_suffix" @click="totAcoinBalace">
                Acoin
              </div>
            </div>
            <div class="_egg_body_r_ant">
              <input type="text" class="_egg_body_r_ipt" v-model="buyUsdtNumber">
              <div class="_egg_body_r_ant_suffix" @click="totUsdtBalace">
                USDT
              </div>
            </div>
          </div>
          <div class="_egg_body_r_btn_warp">
              <!-- <div class="buy_btn_box">
                <div class="buy_btn_item" @click="">授权Acoin</div>
                <div class="buy_btn_item">授权USDT</div>
              </div> -->
            <div class="_egg_body_r_buy_btn" @click="buyMiningUSDT">
              参 与
            </div>
          </div>
          <div class="_egg_my_rews_warp">
            <div class="_egg_my_rews_txt">
              你的奖励
              <span>
                {{ myEarns | num2CurrencyNo }} Bcoin
              </span>
            </div>
            <div class="_egg_my_rews_btns">
              <div class="_refry_btn" @click="compound()">复投</div>
              <div class="_gain_btn" @click="withdraw()">收获</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Web3 = require('@/assets/js/web3.min.js');
import eggABI from '@/abis/eggABI.json';
import usdtABI from '@/abis/usdtABI.json';
import AcoinABI from '@/abis/AcoinABI.json';
import BcoinABI from '@/abis/BcoinABI.json';
import { checkTime,} from '@/assets/js/utils.js';

export default {
  name: 'HomeView',
  components: {
  },
  data() {
    return {
      isShowVideo: false,// video是否显示
      myAddress: null,
      myUSDTBalance: 0,
      myACoinBalance: 0,
      myBCoinBalance: 0,
      myETHBalance: 0, // 钱包主币
      allowanceAmount: 0, // 是否授权
      buyUsdtNumber: '0.1',
      buyAcoinNumber: '1000000',
      refAdd: null,
      WEB3: null,
      contNumber: 0,
      eggContract: null,
      USDTContract: null,
      eggsPerMiner: '', // 合约内一天时间的秒数
      contractBalance: '', // 合约内的BNB余额
      myMiners: '', // 合约中用户的质押的蛋
      toMining: '', // 总算力
      myEggs: '', // 合约中用户获得的奖励
      myEarns: '', // 合约中用户获得的奖励
      // owner: '0x86E90BD044adc97fA04fdeA3708E892aaBE4B046',
      // contractAddress: '0x6f61Bdbb296F0e70C5E529aa7Cb0F08a5bb0811b',
      // USDTContractAddress: '0x55d398326f99059fF775485246999027B3197955',
      owner: '0xb1Fc8F04815A4badc4D8f4b45D63da01D8293510',
      // contractAddress: '0xC0430F5708f9EB4Eed1f70B3781755FD146DA039',
      contractAddress: '0x1A25B08e3964f63247976932fF5A7C6648D1F099',
      USDTContractAddress: '0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684',
      AcoinContractAddress: '0x2ACF695174070329a0B87d3Cd71e2b9b9D0572fB',
      BcoinContractAddress: '0xA01cbBF4c8129784B0D537E18624F2d4a160A465',
      timer: null,
      USDTCI: null,
      IDOCI: null,
      isDespoit: false,
      btnText: '授 权',
      MAX_NUMBER: '115792089237316195423570985008687907853269984665640564039457584007913129639935',
      rateVal: 100000
    }
  },
  filters: {
    showAdd: function(value) {
      return value.substring(0,4) + '....' + value.substr(-4,4);
    },
    showBalance(v){
      //  return this.WEB3.utils.fromWei(v, 'ether');
      // var myBalance = this.Web3.utils.fromWei(value, 'ether');
			// myBalance = parseFloat(myBalance).toFixed(4);
      // return ( parseInt( v * 10000 ) / 10000 ).toFixed(4);
      // return ( parseInt( v * 10000 ) / 10000 ).toFixed(4);
      return (Number(v)).toFixed(4);
    },
    // 数字千分位展示
    num2CurrencyNo (value = 0) {
      if (!value) return 0
      const intPart = Math.trunc(value) // 获取整数部分
      const intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 整数部分处理，增加,
      let floatPart = '' // 预定义小数部分
      const valueArray = value.toString().split('.') // 将数值截取为小数部分和整数部分
      if (valueArray.length == 2) { // 有小数部分
        floatPart = valueArray[1].toString() // 取得小数部分
        return intPartFormat + '.' + floatPart.slice(0,4)
      }
      return intPartFormat + floatPart
    },
  },
  computed: {
    refLinks(){
      if(this.myAddress){
        return window.location.origin + `/?ref=${this.myAddress}`
      }
      return '链接钱包'
    },
    network() {
      // https://bsc-dataseed.binance.org/ 正式网络
      return 'https://data-seed-prebsc-1-s1.binance.org:8545'
    },
  },
  watch: {
    // buyAcoinNumber(nv){
    //   if(nv) this.buyUsdtNumber = nv/this.rateVal
    // },
    // buyUsdtNumber(nv){
    //   if(nv) this.buyAcoinNumber = nv*this.rateVal
    // },
  },
  mounted () {
    document.querySelector(".__home_video").controls = false;
    // 自动播放视频
    let _this = this
    if(this.$route.query && this.$route.query.ref){
      this.refAdd = this.$route.query.ref;
    }
    // Web3浏览器检测
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
    }
    this.WEB3 = new Web3(ethereum);
    ethereum.on("accountsChanged", function(accounts) {
      console.log(accounts[0]);//一旦切换账号这里就会执行
      _this.myAddress = accounts[0];
      _this.joinWeb3();
    });
    // if(ethereum.networkVersion == 97){
    //   return this.$message.error('Please check if the network environment is a production environment');
    // }
    // 检测MetaMask
    if (this.WEB3.currentProvider.isMetaMask == true) {
      console.log('metamask 可用');
      _this.joinWeb3();

    } else {
      console.log('metamask 不可用');
    }
  },
  methods: {
    videoLoad(){
      this.isShowVideo = true;
    },
    progress(){
      this.$notify({
        title: '正在路上',
        message: '团队正在进行中，请关注我们的消息',
        type: 'success',
      });
    },
    cutAdd(){
      this.myAddress = null;
      this.myUSDTBalance = 0;
      this.myUSDTBalance = 0;
      this.myBalance = 0;
      this.buyUsdtNumber = 0;
      this.myEarns = 0;
      this.myMiners = 0;
      this.myETHBalance = 0;
      this.myACoinBalance = 0;
      this.myBCoinBalance = 0;
    },
    async joinWeb3() {
      clearTimeout(this.timer)
        var eggContract = new this.WEB3.eth.Contract(eggABI, this.contractAddress);
        this.IDOCI = eggContract.methods;
        var USDTContract = new this.WEB3.eth.Contract(usdtABI, this.USDTContractAddress);
        this.USDTCI = USDTContract.methods;

        var AcoinContract = new this.WEB3.eth.Contract(AcoinABI, this.AcoinContractAddress);
        this.AcoinCI = AcoinContract.methods;
        
        var BcoinContract = new this.WEB3.eth.Contract(BcoinABI, this.BcoinContractAddress);
        this.BcoinCI = BcoinContract.methods;

        // 请求用户授权 解决web3js无法直接唤起Meta Mask获取用户身份
        const enable = await ethereum.enable();
        // // 授权获取账户
        let accounts = await this.WEB3.eth.getAccounts();
        // 返回指定地址账户的余额
        let balance = await this.WEB3.eth.getBalance(accounts[0]);
        this.myAddress = accounts[0];
        this.getApprove();

        // 账户余额
        try{
          this.myETHBalance = this.WEB3.utils.fromWei(balance, 'ether');
          console.log('this.myETHBalance',this.myETHBalance);
          this.myUSDTBalance = await this.USDTCI.balanceOf(this.myAddress).call();
          this.myUSDTBalance = this.WEB3.utils.fromWei(this.myUSDTBalance, 'ether');
          // A币余额
          this.myACoinBalance = this.WEB3.utils.fromWei(await this.AcoinCI.balanceOf(this.myAddress).call());
          // B币余额
          this.myBCoinBalance = this.WEB3.utils.fromWei(await this.BcoinCI.balanceOf(this.myAddress).call());
          // 合约账户B币余额
          this.contractBalance = this.WEB3.utils.fromWei(await this.IDOCI.getBtokenBalance().call())
          // const AcoinBlanc = this.WEB3.utils.fromWei(await this.IDOCI.getABalance().call())
          // const UsdtBlanc = this.WEB3.utils.fromWei(await this.IDOCI.getUsdtBalance().call())
          // console.log('AcoinBlanc',AcoinBlanc);
          // console.log('UsdtBlanc',UsdtBlanc);

          // eggsPerMiner 一天的时间秒数  864000（秒）
          this.eggsPerMiner = await this.IDOCI.EGGS_TO_HATCH_1MINERS().call();
          // myMiners 用户质押数量
          this.myMiners = await this.IDOCI.hatcheryMiners(this.myAddress).call();
          // myEggs 用户获得的奖励
          this.myEggs =  await this.IDOCI.getMyEggs().call({from:this.myAddress});
          // 
          let myEarns = 0;
          if(this.myEggs > 0){
            myEarns = this.WEB3.utils.fromWei(await this.IDOCI.calculateEggSell(this.myEggs).call());
            if(Number(myEarns) < 0.000001){
              myEarns = 0;
            }
          }
          this.myEarns = myEarns // 计算最终奖励
          console.log('Update');
      }catch(e){
        console.log('eeeeee',e);
      }

    this.timer = setTimeout(()=>{
      this.joinWeb3();
      this.getApprove();
    }, 3000)


    },
    totUsdtBalace(){
      this.buyUsdtNumber = this.myUSDTBalance;
    },
    totAcoinBalace(){
      this.buyAcoinNumber = this.myACoinBalance;
    },
    copyLink(){
      var _input = document.createElement('input')
        _input.value = this.refLinks;
        document.body.appendChild(_input)
        _input.select()
        document.execCommand('Copy')
        this.$message.success('邀请链接复制成功，快去邀请小伙伴赚取佣金吧！！')
        _input.remove()

    },
    getApprove(){
      this.USDTCI.allowance(this.myAddress, this.contractAddress).call((err, res) => {
        if(err) return;
          if(!this.isDespoit) {
            this.AcoinCI.allowance(this.myAddress, this.contractAddress).call((err, res) => {
            if(err) return;
            this.allowanceAmount = this.WEB3.utils.fromWei(res, 'ether');
            if(!this.isDespoit) {
              if(this.isApprove()) {
                this.btnText = '参 与';
              } else {
                this.btnText = '授 权';
              }
            }
          });
        }
      });

    },
    isApprove(){
      return this.allowanceAmount > 0;
    },
    approve(){
      this.USDTCI.approve(this.contractAddress, this.MAX_NUMBER).send({
        from: this.myAddress
      },(err, res) => {
        if(err) return;
          this.AcoinCI.approve(this.contractAddress, this.MAX_NUMBER).send({
            from: this.myAddress
          },(err, res) => {
            if(err) return;
            this.$message.success('授权成功，请等待区块确认',3)
          });
      });
		
    },
    async buyMiningUSDT(){
      let that = this;
      // if(this.myBalance < 20 || this.buyUsdtNumber < 20) return this.$message.error('Minimum deposit amount 20 USDT');
      if(this.isApprove()){
        if(this.IDOCI){
          try{
            const callUsdtValue = this.WEB3.utils.toWei(this.buyUsdtNumber.toString(),'ether');
            const callAcoinValue = this.WEB3.utils.toWei(this.buyAcoinNumber.toString(),'ether');
            let inviter = this.owner;
            if(this.WEB3.utils.isAddress(this.refAdd)){
              inviter = this.refAdd;
            }
            console.log('callAcoinValue, callUsdtValue, inviter', callAcoinValue, callUsdtValue, inviter);
            this.IDOCI.buyEggs(callAcoinValue, callUsdtValue, inviter).send({
              from: this.myAddress,
            })
            .on('transactionHash', (hash)=>{
              console.log(hash);
              this.$message.success('交易已发送，请等待区块确认！',3)
              console.log("Transaction sent",3);
            })
            .once('receipt', res => {
              this.$message.success('交易确认中，恭喜加入自由组织！',3)
              console.log("Transaction confirmed",3);
              this.joinWeb3();
            })
            .catch(err => console.log(err))
          }catch(e){
            console.log(e);
          }
        }
      }else{
        this.approve();
      }
    },
    // 复投
    compound(){
      if(!checkTime()) return this.$message.error('Coming Soon!');
      if(!this.myAddress || this.myAddress === '0x00000000000000000000000000000000deadbeef'){
        return this.joinWeb3();
      }
      if(this.myETHBalance * 1 < 0.001) return this.$message.warning('Gas 费用不够');
      if(this.myEarns * 1 < 0.01){
        this.$message.warning('产量必须大于0.01 USDT');
        return;
      }
      try{
        let inviter = this.owner;
        if(this.WEB3.utils.isAddress(this.refAdd)){
          inviter = affrAddr;
        }
        console.log(inviter);
        this.IDOCI.hatchEggs(inviter).send({
          from: this.myAddress,
        })
        .on('transactionHash', (hash)=>{
          console.log(hash);
          this.$message.success('复投成功，果然是大格局之人！',3)
        })
        .once('receipt', res => {
          this.$message.success("复投交易确认，恭喜您离自由更进一步！",3)
          this.joinWeb3();
        })
        .then(res => {
        })
        .catch(err => console.log(err))
      }catch(e){
        console.log(e);
      }
    },
    // 提取
    withdraw(){
      if(!checkTime()) return this.$message.error('Coming Soon!');
      if(!this.myAddress || this.myAddress === '0x00000000000000000000000000000000deadbeef'){
        return this.joinWeb3();
      }
      if(this.myETHBalance * 1 < 0.001) return this.$message.warning('Gas 费用不够');
      if(this.myEarns * 1 < 0.01) return this.$message.warning('产量必须大于0.01 USDT');
      try{
        this.IDOCI.sellEggs().send({
          from: this.myAddress,
        })
        .on('transactionHash', (hash)=>{
          console.log(hash);
          this.$message.success('提取中，哎呀呀格局小了小了！',3)
        })
        .once('receipt', res => {
          this.$message.success("交易确认，提取奖励成功！",3)
        })
        .then(res => {

        })
        .catch(err => console.log(err))
      }catch(e){
        console.log(e);
      }

    },
    // 开始
    startProject(){
      try{
        this.IDOCI.seedMarket().send({
          from: this.myAddress,
        })
        .on('transactionHash', (hash)=>{
          console.log(hash);
          this.$message.success('项目开始中',3)
        })
        .once('receipt', res => {
          this.$message.success("成功开始运行！",3)
        })
        .then(res => {

        })
        .catch(err => console.log(err))
      }catch(e){
        console.log(e);
      }
    },
    // 项目方提起Acoin
    postCoin(type){
      try{
        // Acoin
        if(type == 'Acoin'){
          this.IDOCI.postAcoinSender().send({
            from: this.myAddress,
          })
          .on('transactionHash', (hash)=>{
            console.log(hash);
            this.$message.success('提取Acoin中，请稍等',3)
          })
          .once('receipt', res => {
            this.$message.success("提取Acoin成功",3)
          }).catch(err => console.log(err))
        }
        // Bcoin
        if(type == 'Bcoin'){
          this.IDOCI.postBcoinSender().send({
            from: this.myAddress,
          })
          .on('transactionHash', (hash)=>{
            console.log(hash);
            this.$message.success('提取Bcoin中，请稍等',3)
          })
          .once('receipt', res => {
            this.$message.success("提取Bcoin成功",3)
          }).catch(err => console.log(err))
        }
        // USDT
        if(type == 'Bcoin'){
          this.IDOCI.postUsdtSender().send({
            from: this.myAddress,
          })
          .on('transactionHash', (hash)=>{
            console.log(hash);
            this.$message.success('提取USDT中，请稍等',3)
          })
          .once('receipt', res => {
            this.$message.success("提取USDT成功",3)
          }).catch(err => console.log(err))
        }

      }catch(e){
        console.log(e);
      }
    }
  },
}
</script>
<style lang="less" scoped="true">

.__home{
  min-height: 100vh;
  background: linear-gradient(163.68deg, #579b7f 15.43%, #74b6a2 83.92%);
  position: relative;
  overflow: hidden;
}
.__home_video{
  width: 400px;
  height: 300px;
  pointer-events: none;
  border-radius: 8px;
}
.__header{
  display: flex;
  align-items: flex-start;
  justify-content:space-between;
  padding: 20px 10px 0 10px;
}
.__header_l{
  display: flex;
  .__header_l_link{
    border-radius: 4px;
    display: block;
    margin-right: 10px;
  }
  a{
    img{
      width: 60px;
    }
  }
}
.__header_c{
  img{
    width: 200px;
  }
}
.__header_r{
  cursor: pointer;
  color: #fff;
  font-weight: 600;
  padding: 10px 20px;
  width: 180px;
  text-align: center;
  border-radius: 20px;
  background: linear-gradient(270deg, #5fa388, #12815c);
  transition: all .3s;
  box-shadow: 3px 0px 25px 11px #ffffff80;
  &:hover{
    transform:translateY(-2px);
  }
}
.__home_ctx{
  position: relative;
  z-index: 1;
}
._egg_title{
  width: 100%;
  font-size: 36px;
  margin: 25px auto;
  text-align: center;
  color: #000;
  // text-shadow: 0px 1px 1px #ddd,
  //               0px 2px 1px #d6d6d6,
  //               0px 3px 1px #ccc,
  //               0px 4px 1px #c5c5c5,
  //               0px 5px 1px #c1c1c1,
  //               0px 6px 1px #bbb,
  //               0px 7px 1px #777;
  transition:all .8s ease-in-out;  
  -o-transition:all .8s ease-in-out;  
  -moz-transition:all .8s ease-in-out;  
  -webkit-transition:all .8s ease-in-out;
}
.__home_clock{
  position: absolute;
  right: 0;
  top: 60vh;
  width: 448px;
}
.__home_mark{
  position: absolute;
  left: 0;
  top: 25vh;
  width: 248px;
}
._egg_odds{
  display: flex;
  align-items: center;
  justify-content:center;
  margin-bottom: 100px;
  ._egg_odds_item{
    display: block;
    cursor: pointer;
    margin: 20px;
    padding: 20px;
    font-weight: 600;
    border-radius: 10px;
    background:#ffffff42;
    transition: all 0.3s;
    box-shadow: 0px 100px 80px rgb(0 0 0 / 7%), 0px 41.7776px 33.4221px rgb(0 0 0 / 5%), 0px 22.3363px 17.869px rgb(0 0 0 / 4%), 0px 12.5216px 10.0172px rgb(0 0 0 / 4%), 0px 6.6501px 5.32008px rgb(0 0 0 / 3%), 0px 2.76726px 2.21381px rgb(0 0 0 / 2%);
    &:hover{
      transform:translateY(-2px);
    }
  }
  .__odds_icon{
    // width: 50px;
    height: 50px;
    margin-right: 10px;
  }
}
._egg_body{
  display: flex;
  flex-direction: column; 
  margin: 0 auto;
  width: 800px;
  max-width: 100%;
  align-items: stretch;
  grid-gap: 20px;
  gap: 20px;
}
._egg_body_left{
  position: relative;
  // width: calc(50% - 10px);
  padding: 20px;
  padding-top: 130px;
  border-radius: 20px;
  // box-shadow: 3px 0px 25px 11px #ffffff80;
  // background: radial-gradient(#12815d, transparent);
  background: #40a081;
  ._egg_info_warp{
    width: 100%;
  }
  ._egg_info_icon{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -100px;
  }
  ._egg_info_ctx{

  }
  ._egg_info_tlt{
    color:#000;
    font-size: 20px;
    font-weight: 600;
  }
  ._egg_info_item{
    color:#000;
    font-size: 14px;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    padding: 8px 0;
    box-shadow: inset 0px -0.5px 0px #F5F5F5;
    span{
      font-weight: 600;
    }
  }
  ._egg_referral{
    margin-top: 20px;
  }
  ._egg_referral_tlt{
    color:#000;
    font-size: 20px;
    font-weight: 600;
  }
  ._egg_referral_desc{
    color:#000;
    font-size: 14px;
    font-weight: 400;
    margin-top: 10px;
  }
  // 复制推荐码
  ._egg_referral_ipt{
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color:#000;
    ._egg_referral_ipt_txt{
      color:#000;
      border-radius: 32px;
      flex-grow: 2;
      max-width: 70%;
      text-align: center;
      cursor: text;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      padding: 10px 15px;
      box-shadow: inset -2px -2px 4px rgba(255, 255, 255, 0.5), inset 2px 2px 4px rgba(170, 170, 204, 0.25), inset 5px 5px 10px rgba(170, 170, 204, 0.5), inset -5px -5px 10px #FFFFFF;
    }
    ._egg_referral_ipt_btn{
      color:#fff;
      cursor: pointer;
      padding: 10px 15px;
      background: #068060;
      box-shadow: 0px 100px 80px rgba(0, 0, 0, 0.07), 0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198), 0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035), 0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725), 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
      border-radius: 32px;
      &:hover{
        background: #fff;
        color: #068060;
      }
    }
  }
}
._egg_body_right{
  // width: calc(50% - 10px);
  padding: 20px;
  // box-shadow: 3px 0px 25px 11px #ffffff80;
  // background: radial-gradient(#12815d, transparent);
  background: #40a081;
  border-radius: 20px;
  ._egg_body_r_item{
    margin: 10px 0;
    border-radius: 10px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 400;
    padding: 10px;
    font-size: 18px;
    color:#000;
    background: linear-gradient(270deg,#007f5f,#fff00000);
    span{
      font-weight: 600;
      color: #000;
    }
    .egg_blacne_token{
      font-weight: 600;
      color: #000;
    }
  }
  ._egg_body_r_lp_warp{
    display: flex;
    align-items:center;
    gap: 20px;
  }
  ._egg_body_r_ant{
    width: 50%; 
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 25px;
    padding: 2px 16px;
    box-shadow: inset -2px -2px 4px rgb(255 255 255 / 50%), inset 2px 2px 4px rgb(170 170 204 / 25%), inset 5px 5px 10px rgb(170 170 204 / 50%), inset -5px -5px 10px #ffffff;
  }
  ._egg_body_r_ipt{
    flex-grow: 2;
    max-width: 80%;
    height: 44px;
    background: #fff0;
    text-align: center;
    color: #000;
    font-size: 20px;
    font-weight: 600;
  }
  ._egg_body_r_ant_suffix{
    cursor: pointer;
    font-weight: 600;
  }
  .buy_btn_box{
    display: flex;
    align-items:center;
    justify-content:space-between;
    gap:20px;
    margin-top: 20px;
    .buy_btn_item{
      display: flex;
      padding: 11px 0;
      cursor: pointer;
      color: #000;
      align-items: center;
      justify-content: center;
      border: 1px solid #fff;    
      font-weight: 600;
      border-radius: 25px;
      flex-basis: 50%;
    }
  }
  ._egg_body_r_buy_btn{
    border-radius: 25px;
    display: flex;
    padding: 11px 0;
    cursor: pointer;
    color: #000;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    border: 1px solid #fff;    
    font-weight: 600;
    &:hover{
      color:#000;
      border: 1px solid #fff; 
      background:#fff;
    }
  }

  ._egg_my_rews_warp{
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ._egg_my_rews_txt{
      display: flex;
      flex-direction: column;
      font-weight: 600;
      color:#000;
      span{
        margin-top: 10px;
        font-weight: 800;
        font-size: 24px;
        color: #fff;
        // text-shadow: 0 1px 1px #ddd, 0 2px 1px #d6d6d6, 0 3px 1px #ccc, 0 4px 1px #c5c5c5, 0 5px 1px #c1c1c1, 0 6px 1px #bbb, 0 7px 1px #777;
        transition: all .8s ease-in-out;
        -o-transition: all .8s ease-in-out;
        -moz-transition: all .8s ease-in-out;
        -webkit-transition: all .8s ease-in-out;
      }
    }
    ._egg_my_rews_btns{

      ._refry_btn,._gain_btn{
        margin: 10px 0;
        padding: 8px 20px;
        border-radius: 8px;
        background: #fff;
        color: #007f5f;
        text-align: center;
        cursor: pointer;
        transition: all .3s;
        &:hover{
          transform:translateY(-2px);
        }
      }

    }
  }
}

@media (max-width: 765px){
  .__home_mark{
    top: 60%;
    left: -20%;
  }
  .__home_clock{
    bottom: -5%;
    right: 0;
    width: 400px;
    top: auto;
  }
  ._egg_odds{
    display: block;
  }
  .__header{
    align-items: center;
    flex-direction: column-reverse;
    .__header_c{
      margin: 30px 0;
      img{
        width: 150px;
      }
    }
  }
  ._egg_body{
    margin: 0px auto 0;
    align-items: center;
    flex-direction: column;
    grid-gap: 10px;
    gap: 10px;
  }
  ._egg_body_left,._egg_body_right{
    width: calc(100% - 20px);
  }
}



// 隐藏video控件
/* 隐藏video 全屏按钮 */
.__home_video::-webkit-media-controls-fullscreen-button {
		display: none;
}
/* 隐藏video 播放按钮 */
.__home_video::-webkit-media-controls-play-button {
		display: none;
}
/* 隐藏video 进度条 */
.__home_video::-webkit-media-controls-timeline {
		display: none;
}
/* 隐藏video 观看的当前时间 */
.__home_video::-webkit-media-controls-current-time-display{
		display: none;            
}
/* 隐藏video 剩余时间 */
.__home_video::-webkit-media-controls-time-remaining-display {
		display: none;            
}
/* 隐藏video 音量按钮 */
.__home_video::-webkit-media-controls-mute-button {
		display: none;            
}
.__home_video::-webkit-media-controls-toggle-closed-captions-button {
		display: none;            
}
/* 隐藏video 音量的控制条 */
.__home_video::-webkit-media-controls-volume-slider {
		display: none;            
}
/* 隐藏video 所有控件 */
.__home_video::-webkit-media-controls-enclosure{ 
		display: none;
}


</style>
