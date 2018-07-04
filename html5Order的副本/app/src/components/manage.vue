<template>
 <div>
   <el-row :gutter="20">
     <el-col :span="6" :offset="1">
     <el-button>默认按钮</el-button>
     <el-button type="primary">主要按钮</el-button>
     </el-col>
     <el-col :span="6" :offset="11">
       <el-button>默认按钮</el-button>
       <el-button type="primary">主要按钮</el-button>
     </el-col>
   </el-row>
 </div>
</template>
<script>
  export default {
    data(){
      return {
        title:"jejjk"
      }
    }
  }
</script>
