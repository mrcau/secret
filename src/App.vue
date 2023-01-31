<template>
  <v-app> 
    <div class="mainBox">
      <div class="top mb-3">
        <v-img src="@/assets/secret.png" width="20%" max-width="200px" style="position: absolute;top:10px;left:10px;z-index: 10;"></v-img>
        <h1 class="white--text mt-5">{{ year }}</h1>
        <h1 class="white--text">SECRET TODO</h1> 
          <v-btn-toggle v-model="menu" color="white" mandatory dark group class="d-flex mb-3" >
            <v-btn dark  value="goal" @click="menuToggle('goal')" style="width:50%">   <h2>Goal</h2>  </v-btn> 
            <v-btn dark  value="vision" @click="menuToggle('vision')" style="width:50%"> <h2>Vision</h2> </v-btn> 
          </v-btn-toggle>
        <div>
          <v-btn color="var(--main-color)" fab small @click="addList" v-if="menu==='goal'">
            <span class="mdi mdi-plus" style="font-size: 25px;color:white ;" ></span>
          </v-btn> 

        </div>
      </div>
        <div class="box" v-if="menu==='goal'">
        <div class="white--text" v-if="!items.length">          
          <h3 class="mt-10"> "Imagination becomes a reality." </h3> 
          <h3> "Dream vividly and it will come true." </h3>
          <h3> "If you dream desperately, it will come true."</h3>
          <h3 class="mt-10"> "상상은 현실이 된다." </h3> 
          <h3> "간절히 꿈꾸면 이루어진다." </h3>
          <h3>  "생생하게 꿈꾸면 이루어진다." </h3>
        </div>
          <div v-for="(n,i) in items" :key="i" class="item color" :class="n.class+i" @click="select(n,i)"
            :style="`background: linear-gradient(45deg, ${n.color1} 0%, ${n.color2} 100%)`" >
            <!-- :style="`background: linear-gradient(45deg, ${colors[Math.floor(Math.random() * colors.length)]} 0%, ${colors[Math.floor(Math.random() * colors.length)]} 100%)`" > -->
              <h2 >{{n.title}}</h2> <v-spacer></v-spacer>
            <v-rating :value="n.star" small color="var(--main-color)" hover readonly ></v-rating>
            <v-progress-linear color="var(--main-color)" dark class="mt-8" height="15" style="border-radius: 10px;" :value="filter(n)" >
              {{ filter(n)}}%
            </v-progress-linear>
            <div class="d-flex">
              <v-spacer></v-spacer> <h4>{{ n.Dday }}</h4>
            </div>
          </div> 
        </div>
        <div v-else>
          <v-form ref="form2" lazy-validation class="d-flex px-3 mb-3">
             <v-text-field v-model="item.keyword"   :rules="Rules" required dark  
             dense color="var(--main-color)"
                placeholder="이미지를 입력해주세요." class="mt-3 mr-3" style=" font-style: normal" ></v-text-field>
              <v-btn dark color="var(--main-color)" class="mt-3" small :loading="loading" @click="serch()"  > <h3>SERCH</h3> </v-btn>
          </v-form>
          <div class="box2" > 
            <v-img class="img" v-for="(n,i) in items" :key="i" :src="n.title" @click="select(n,i)"  />
          </div>
        </div>
          
      <footer  style=" color:white">
      <!-- <footer  style="position: fixed;bottom: 0;left: 50%;transform: translateX(-50%);color:white"> -->
        © Kms-Builder
      </footer>
      <!-- <v-btn color="primary" fab @click="deleteAll" ><v-icon>mdi-minus</v-icon></v-btn> --> 
      <v-dialog v-model="dialog" persistent max-width="500px" style="position: relative;" >
          <v-card color="secondary"   >
              <v-btn dark text icon small style="position: absolute; top:1px; right: 1px;" @click="dialog=false" >
                <span class="mdi mdi-close"></span> </v-btn>
              <v-form ref="form1" lazy-validation>
                <v-rating v-model="item.star" color="var(--main-color)" hover ></v-rating>
                <v-btn dark dense icon style="padding: 0;position: absolute;top:0;left:0" @click="remove" v-if="edit" >
                      <span class="mdi mdi-delete" style="font-size: 25px;"></span>
                </v-btn> 
                <v-card-title class="text-h5 white--text mx-5 pt-3" style="padding:0;">
                  <!-- <h4>{{ title }} </h4>  -->
                  <v-text-field v-model="title" label="GOAL" :rules="Rules" required dark  dense color="var(--main-color)"
                  placeholder="목표를 입력해주세요." class="mt-3" style=" font-style: normal" ></v-text-field>
                </v-card-title> 
                
                <v-btn color="var(--main-color)" fab small @click="addItemList">
                  <span class="mdi mdi-plus" style="font-size: 30px;color:white ;" ></span>
                </v-btn>
                  <!-- 다이알로그 내용 -->  
                  <div class="px-5 pt-5 rounded"  >
                    <!-- <v-text-field v-model="title" label="GOAL" :rules="Rules" required dark filled outlined dense color="var(--main-color)"
                      style="padding: 0; margin: 0; font-style: normal" ></v-text-field> -->
                  <!-- 세부할일 -->
                    <div class="d-flex" v-for="(n,i) in item.contents" :key="i">
                      <!-- 체크박스 -->
                      <v-checkbox v-model="item.contents[i].tf" color="red darken-3" dark style="transform:translateY(-10px);" />
                      <!-- 세부내용 -->
                        <v-text-field v-model="item.contents[i].name" label="TODO" :disabled="item.contents[i].tf" placeholder="실천사항을 입력해 주세요."
                        :rules="Rules" required dark filled outlined dense color="var(--main-color)"
                        style="padding: 0; margin: 0; font-style: normal" ></v-text-field>
                      <!-- 세부삭제 -->
                       <v-btn dark dense icon class="ml-1" style="padding: 0;" @click="removeItem(i)" >
                           <span class="mdi mdi-delete" style="font-size: 25px;color: var(--main-color);"></span>
                       </v-btn> 
                    </div>
                  </div>

                <!-- 제출버튼 -->
                <v-card-actions  >
                  <v-btn rounded class="mb-2 white--text" block color="var(--main-color)"  :loading="loading" @click="save()" > <h2>SAVE</h2> </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
      </v-dialog>

      <v-dialog v-model="dialog2" persistent max-width="80%" style="position: relative;" >
          <v-card color="secondary"   >
            <v-card-title style="padding: 0;margin: 0;" >
              <v-btn dark  icon smallv-if="edit" @click="remove">
                <span class="mdi mdi-delete" style="font-size:large;"></span>
              </v-btn> 
              <v-spacer></v-spacer>
              <v-btn dark  icon small @click="dialog2=false" >
                <span class="mdi mdi-close" style="font-size:large;"></span> 
              </v-btn>
            </v-card-title>
                 <!-- <v-img class="img" v-for="(n,i) in items" :key="i" :src="n.title" @click="select(n,i)"  /> -->
                 <img class="img" v-if="edit"  :src="item.title" @error="imgError"  /> 
                 <div  class="imgBox"  v-else>                 
                      <v-img class="img" v-for="(n,i) in serchItems" :key="i" :src="n.image.thumbnailLink"  @error="googleError" @click="save(n)"  />
                        <!-- <img  style="width:100px ;height:100px"  :src="n.image.thumbnailLink"  @error="googleError" @click="save(n)" />                   -->
                </div>
            </v-card>

            <!-- <v-card color="secondary" v-else  >
              <v-form ref="form2" lazy-validation>
                <v-rating v-model="item.star" color="var(--main-color)" hover ></v-rating>
                <v-btn dark dense icon style="padding: 0;position: absolute;top:0;right:0" 
                v-if="edit" @click="remove">
                      <span class="mdi mdi-delete" style="font-size: 25px;"></span>
                </v-btn> 
                <v-card-title class="text-h5 white--text mx-5 pt-3" style="padding:0;">
                 <v-text-field v-model="item.title" label="IMAGE LINK" :rules="Rules" required dark  dense color="var(--main-color)"
                    placeholder="이미지 링크를 입력해주세요." class="mt-3" style=" font-style: normal" ></v-text-field>
                </v-card-title> 
                  
                <div class="text-center"> -->
                    <!-- <v-file-input accept="image/*" label="사진" id="imginput" @change="addPic" style="display: none" /> -->
                    <!-- <label for="imginput">                     -->
                      <!-- <img style="width:100% ;height:300px" v-if="item.title"  :src="item.title" @error="imgError"  />                  
                      <img style="width:100% ;height:300px" v-else  :src="require('@/assets/img.jpg')"   />                   -->
                    <!-- </label> -->
                <!-- </div>
                <v-card-actions  >
                  <v-btn rounded class="mb-2 white--text" block color="var(--main-color)"  :loading="loading" @click="save()" > <h2>SAVE</h2> </v-btn>
                </v-card-actions>
              </v-form>
            </v-card> -->

      </v-dialog>

      
  </div>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data() {
      return {
          version: '20230130',
          loaded:false,
          year: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substring(0,4),
          today: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substring(0, 10),
          Rules: [(v) => !!v || "필수입력란"],
          title:'',
          menu:'goal',
          edit:false,
          star:'',
          contents:[], 
          content:'',
          index:'',
           loading: false,
           items:[],
           visionItems:[],
          //  colors:[ '#85FFBD', '#FFFB7D','#0093e9' , '#80d0c7','#8ec5fc', '#e0c3fc', '#d9afd9' , '#97d9e1','#3eecac' , '#ee74e1'],
           colors:['#4158D0','#C850C0','#FFCC70','#FFE53B','#FF2525',
                  '#08AEEA','#2AF598','#21D4FD','#B721FF','#FA8BFF','#2BD2FF',
                  '#2BFF88','#FBDA61','#FF9A8B','#FF6A88','#FF99AC','#FF9A8B','#16A085',
                  '#FF6A88','#FF99AC','#FAD961','#F76B1C','#FA709A','#F4D03F'],
           item:{},
           dialog:false,
           dialog2:false,
           img:true,
           file:'',
           imgUrl:'',
           googleapis:'',
           google:true,
           serchItems:[]
      };
  },

  mounted() {
  this.getV(),
  this.getItems(),
  window.addEventListener('keypress',(e)=>{
    if(e.key =='Enter'){
      e.preventDefault()
    }
   })
  },

  methods: { 
    async getV () {
      fetch('https://mrcau.github.io/version/version.json')
      .then(response=>response.json())
      .then(json=>{
        this.googleapis = json.googleapis
        if (json.version !== this.version) {this.reload()}
      }).catch(error=>{console.log(error);});
      },

    async reload () {
      caches
        .keys()
        .then(c => {
          for (const i of c) {
            caches.delete(i)
          }
        })
        .then(() => {
          location.reload(true)
        })
    },
    imgError(e){
      this.img = false;
      e.target.src =require('@/assets/errorimg.png')
    },  
    googleError(e){
      e.target.style = 'display:none'
      // e.target.src =require('@/assets/errorimg.png')
    },  
    async addPic(e) { 
      this.file = e; 
      const url = URL.createObjectURL(e);
      this.item.title = url;
    },
    menuToggle(n){
      this.menu = n
      if(n==='goal'){
        this.getItems()
      }else{
        this.getVisions()
      }
    },  
      addList(){ 
          this.serchItems = []
        if(this.menu==='goal'){
          this.dialog=true
          this.edit=false;
          this.title=''
          this.item ={
              title:'', 
              contents:[{tf:false,name:''},{tf:false,name:''}], 
              Dday:this.today,class:'item',star:4,progress:50,
              color1:this.colors[Math.floor(Math.random() * this.colors.length)],
              color2:this.colors[Math.floor(Math.random() * this.colors.length)]
          }
        }else{
          this.dialog2=true;
          this.keyword='';
          this.edit=false;
          this.item ={
              title:'', 
              contents:[{tf:false,name:'실천사항'},{tf:false,name:'실천사항'}], 
              Dday:this.today,class:'item',star:4,progress:50,
              color1:this.colors[Math.floor(Math.random() * this.colors.length)],
              color2:this.colors[Math.floor(Math.random() * this.colors.length)]
          }
        }
      },
      addItemList(){
        this.item.contents.unshift({tf:false,name:'실천사항'})
      },
      getItems(){
         const items = JSON.parse( localStorage.getItem('samtodoItems'))||[]
         this.items = items.sort((a,b)=>{return b.star-a.star})
      },
      getVisions(){
          // localStorage.removeItem('visionItems');
          const items = JSON.parse( localStorage.getItem('visionItems'))||[]
          this.items = items.sort((a,b)=>{return b.star-a.star})
      },
      filter(n){
        if(!n||!n.contents){return}
       return Math.floor(((n.contents.filter(a=>a.tf===true)).length/ n.contents.length)*100)
      },
      select(n,i){
        this.index = i
        this.edit=true;
        this.item=n;
        this.title=n.title
        if(this.menu==='goal'){
          this.dialog=true;
        }else{
          this.dialog2=true;
        }
      },
      // deleteAll(){ localStorage.removeItem('samtodoItems');  this.getItems()  },

      save(n){  
        if(this.edit){
          this.items[this.index]=this.item
          if(this.menu==='goal'){
            const valid = this.$refs.form1.validate();
            if (!valid) {
              return;
            }
            this.item.title = this.title
          localStorage.removeItem('samtodoItems');
          localStorage.setItem('samtodoItems',[JSON.stringify(this.items)])
          }else{
            const valid = this.$refs.form2.validate();
            if (!valid) {
              return;
            }
          localStorage.removeItem('visionItems');
          localStorage.setItem('visionItems',[JSON.stringify(this.items)])
          }
        }else{
          
          if(this.menu==='goal'){
            const valid = this.$refs.form1.validate();
            if (!valid) {
              return;
            }
          this.items.unshift(this.item)
            this.item.title = this.title
            localStorage.setItem('samtodoItems',[JSON.stringify(this.items)])
          }else{
            const valid = this.$refs.form2.validate();
            if (!valid||!this.img) {
              return;
            }
            this.item.title = n.link
          this.items.unshift(this.item)
            localStorage.setItem('visionItems',[JSON.stringify(this.items)])
          }
        }
          this.dialog=false;
          this.dialog2=false;
          this.serchItems = []
      },
      serch(){
        if(!this.item.keyword){return}
        this.dialog2=true;
        this.edit = false;
        this.serchItems = []
        this.loading = true
        fetch(
          `${this.googleapis+this.item.keyword}`
            ).then((response) => response.json()).then((data) => {
            this.serchItems = data.items
            this.loading=false
          }).catch((e)=>{console.log(e)});
      },
      remove(){
        this.items.splice(this.index,1)
          if(this.menu==='goal'){
          localStorage.removeItem('samtodoItems');
          localStorage.setItem('samtodoItems',[JSON.stringify(this.items)])
        this.dialog=false;
          }else{
          localStorage.removeItem('visionItems');
          localStorage.setItem('visionItems',[JSON.stringify(this.items)])
        this.dialog2=false;
        }
      },
      removeItem(i){
        this.item.contents.splice(i,1) 
      }, 
      
  },
};
</script>

<style >
/* @import url('https://fonts.googleapis.com/css2?family=Dongle&family=Stardos+Stencil:wght@400;700&display=swap'); */
:root{
  --main-color: #aa1d2b
}
#app{
  background-image: url;
  background-color:  #424242;
  font-style: italic;
  font-family: 'Stardos Stencil','Dongle',sans-serif;;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  letter-spacing: 0.5px;
  box-sizing: border-box; padding:0;margin: 0;
  /* 글자부드럽게 */
  transform : rotate(0.04deg); 
  height: 100%;
} 
@font-face{
  font-family: 'Stardos Stencil' ;
    src:url('@/assets/font/Stardos_Stencil/StardosStencil-Bold.ttf') format('truetype');
  unicode-range:U+0041-005A, U+0061-007A, U+0030-0039;
}
/* @font-face{
  font-family: 'Dongle' ;
    src:url('@/assets/font/Dongle/Dongle-Bold.ttf') format('truetype');
  unicode-range:U+AC00-U+D7A3,U+0020-002F, U+003A-0040, U+005B-0060, U+007B-007E;
} */
/* .container{
  width: 100%;
  height: 100%;
  background-color: #424242;
  display: grid;
  grid-template-rows: 50px auto 50px;
} */ 
footer{
  padding:10px;
}
.mainBox{
  height:100%;
  background-color: #424242;
  padding:0 0 20px 0;
  flex-wrap: wrap;
  
  /* display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 220px 1fr 100px ; */

}
.box {
  padding: 20px;
  height: 70%;
  overflow-y: auto;
  overflow-x: hidden;
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(350px,1fr));
  grid-auto-rows: 150px;
  gap: 10px; 
}
.imgBox {
  /* padding: 20px 0 0 0; */
  height: 70%;
  overflow-y: auto;
  overflow-x: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 180px;
}
.box2 {
  /* padding: 20px 0 0 0; */
  height: 70%;
  overflow-y: auto;
  overflow-x: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 180px;
}
@media (min-width: 600px) {
  .box2{
  grid-template-columns: 1fr 1fr 1fr;
  }
}
@media (min-width: 1024px) {
  .box2{
  grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
.item {
  color: rgba(255,255,255,.9);
  text-align: left;
  padding: 10px;
  border-radius: 10px;
}
.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
/*=============== SCROLL BAR ===============*/
::-webkit-scrollbar {
  width: 0.6rem;
  border-radius: 0.5rem;
  background-color: hsl(210, 8%, 15%);
}
::-webkit-scrollbar-thumb {
  background-color: hsl(210, 8%, 45%);
  border-radius: 0.5rem;
}
::-webkit-scrollbar-thumb:hover {
  background-color: var(--main-color);
  /* background-color: hsl(210, 8%, 35%); */
}
</style>