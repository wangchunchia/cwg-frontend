<template>
  <div class="box">
    <div class="card">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="IDL列表" name="list">
          <!-- <div class="box-card">
            <el-button type="primary" @click="getService">查询</el-button>
          </div> -->
          <div class="search-bar">
            <el-input v-model="searchKeyword"
                      placeholder="请输入关键词"
                      @keyup.enter.native="handleSearch"
                      clearable>
            </el-input>
            <el-button type="primary" @click="handleSearch" class="search-button">搜索</el-button>
          </div>

          <el-table :data="serviceInfo" style="width: 100%">
            <el-table-column type="index" width="50" />
            <el-table-column prop="serviceName" label="Service Name" width="200" />
            <el-table-column prop="serviceIdl" label="Idl Path" width="200" />
            <el-table-column prop="serviceIdlContent" label="Description" width="200" />
            <el-table-column prop="operation" label="Operation" width="280">
              <template #default="scope">
                <el-button type="primary" @click="routeToChangeService(scope)">修改</el-button>
                <el-button type="primary" @click="deleteService(scope)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-table :data="serviceInfo" style="width: 100%">
            <!-- 列定义 -->
          </el-table>

        </el-tab-pane>
        <el-tab-pane label="新增IDL" name="add" lazy>
          <div class="box-card">
            <div class="form">
              <el-card>
                <el-form :model="formData">
                  <el-form-item label="服务名">
                    <el-input v-model="formData.serviceName" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item label="idl路径">
                    <el-input v-model="formData.serviceIdl" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item label="idl具体内容">
                    <el-input v-model="formData.serviceIdlContent" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item>
                    <div class="box-card">
                      <el-button type="primary" @click="addService">新增</el-button>
                    </div>
                  </el-form-item>
                </el-form>
              </el-card>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="修改IDL" name="put" disabled lazy>
          <div class="box-card">
            <div class="form">
              <el-card>
                <el-form :model="formData">
                  <el-form-item label="服务名">
                    <el-input v-model="formData.serviceName" placeholder="" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="idl路径">
                    <el-input v-model="formData.serviceIdl" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item label="idl具体内容">
                    <el-input v-model="formData.serviceIdlContent" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item>
                    <div class="box-card">
                      <el-button type="primary" @click="changeService">修改</el-button>
                    </div>
                  </el-form-item>
                </el-form>
              </el-card>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="服务请求测试" name="test" lazy>
          <div class="box-card">
            <div class="form">
              <el-card>
                <el-form :model="serverTestForm">
                  <el-form-item label="请求服务名">
                    <el-input v-model="serverTestForm.serviceName" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item label="请求方法名">
                    <el-input v-model="serverTestForm.methodName" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item label="json体内容">
                    <el-input v-model="serverTestForm.jsonContent" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item>
                    <div class="box-card">
                      <el-button type="primary" @click="testService">测试服务接口</el-button>
                    </div>
                  </el-form-item>
                </el-form>
              </el-card>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import type { TabsPaneContext } from "element-plus";
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'

const url = "http://localhost:8888"

const searchKeyword = ref('');

function handleSearch() {
  const keyword = searchKeyword.value.trim().toLowerCase(); // 去除前后空格，并转换为小写

  // 根据关键词过滤服务信息
  if (keyword === '') {
    // 如果关键词为空，则显示所有服务信息
    serviceInfo.value = serviceInfoBackup.value;
  } else {
    // 使用 Array.prototype.filter() 方法进行过滤
    serviceInfo.value = serviceInfoBackup.value.filter((service) => {
      // 在这里根据实际的字段来进行匹配
      // 假设服务名称字段是 service.serviceName
      return service.serviceName.toLowerCase().includes(keyword);
    });
  }
}

//
// function handleSearch() {
//   const keyword = this.searchKeyword.trim().toLowerCase();// 去除前后空格，并转换为小写
//
//   // 根据关键词过滤服务信息
//   if (keyword === '') {
//     // 如果关键词为空，则显示所有服务信息
//     this.filteredServiceInfo = this.serviceInfo;
//   } else {
//     // 使用 Array.prototype.filter() 方法进行过滤
//     this.filteredServiceInfo = this.serviceInfo.filter((service) => {
//       // 在这里根据实际的字段来进行匹配
//       // 假设服务名称字段是 service.serviceName
//       return service.serviceName.toLowerCase().includes(keyword);
//     })
//   }
// }


const addService = () => {
  // 构造请求的数据
  const requestData = formData.value;

  console.log(requestData)
  // 发送POST请求到后端
  axios.post(url + "/add-service", requestData)
    .then(response => {
      // 处理成功响应
      console.log("新增成功！", response.data);
      // 在此处可以处理成功响应后的操作，比如刷新数据等
      ElMessageBox.alert('增加成功!成功增加该服务对应IDL', 'Message', {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: 'OK',
        callback: (action: Action) => {
          ElMessage({
            type: 'success',
            message: '增加成功',
          })
        },
      })
      getService();
    })
    .catch(error => {
      // 处理错误
      console.error("新增失败！", error);
      // 在此处可以处理请求失败后的操作，比如显示错误信息等
      ElMessageBox.alert('增加失败！请检查服务名是否重复', 'Message', {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: 'OK',
        callback: (action: Action) => {
          ElMessage({
            type: 'error',
            message: '增加失败',
          })
        },
      })
    });
};

const activeName = ref("list");


const formData = ref({
  serviceName: "teacher-server",
  serviceIdl: "../idl/teacher.thrift",
  serviceIdlContent: "teacherIDL",
});


onMounted(() => {
  console.log("getting algo tables");
  getService();
})


const serviceInfo = ref([
  {
    serviceName: "获取失败",
    serviceIdl: "获取失败",
    serviceIdlContent: "获取失败",
  },
]);
const serviceInfoBackup = ref([]);//保存原始的服务信息，以便在搜索时能够还原
const getService = () => {
  axios.post(url + "/list-service")
    .then(response => {
      // 处理成功响应
      console.log("获取成功！", response.data);
      // 在此处可以处理成功响应后的操作，比如刷新数据等
      serviceInfo.value = response.data

      serviceInfoBackup.value = response.data;
    })
    .catch(error => {
      // 处理错误
      console.error("获取失败！", error);
      // 在此处可以处理请求失败后的操作，比如显示错误信息等
    });
}

const routeToChangeService = (row: any) => {
  console.log(row)
  activeName.value = "put"
  formData.value = serviceInfo.value[row.$index]
}

const changeService = () => {
  // 构造请求的数据
  const requestData = formData.value;

  console.log(requestData)
  // 发送POST请求到后端
  axios.post(url + "/update-service", requestData)
    .then(response => {
      // 处理成功响应
      console.log("修改成功！", response.data);
      // 在此处可以处理成功响应后的操作，比如刷新数据等
      ElMessageBox.alert('修改成功!成功修改该服务对应IDL', 'Message', {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: 'OK',
        callback: (action: Action) => {
          ElMessage({
            type: 'success',
            message: '修改成功',
          })
        },
      })
      getService();
    })
    .catch(error => {
      // 处理错误
      console.error("修改失败！", error);
      // 在此处可以处理请求失败后的操作，比如显示错误信息等
      ElMessageBox.alert('修改失败！请检查服务名是否重复', 'Message', {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: 'OK',
        callback: (action: Action) => {
          ElMessage({
            type: 'error',
            message: '修改失败',
          })
        },
      })
    });
};

const deleteService = (row: any) => {
  axios.post(url + "/delete-service", { serviceName: serviceInfo.value[row.$index].serviceName })
    .then(response => {
      // 处理成功响应
      ElMessageBox.alert('删除成功！' + response.data, 'Message', {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: 'OK',
        callback: (action: Action) => {
          ElMessage({
            type: 'success',
            message: `删除成功`,
          })
        },
      })
      getService();
    })
    .catch(error => {
      // 处理错误
      console.error("删除失败！", error);
      // 在此处可以处理请求失败后的操作，比如显示错误信息等
      ElMessageBox.alert('删除服务失败，请检查RPC服务端', 'Message', {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: 'Fail',
        callback: (action: Action) => {
          ElMessage({
            type: 'error',
            message: `删除失败`,
          })
        },
      })
    });
}


const serverTestForm = ref({
  serviceName: "teacher-server",
  methodName: "Query",
  jsonContent: "{\n" +
    "  \"name\": \"test query things\"\n" +
    "}",
});

const testService = () => {
  const reqObj = JSON.parse(serverTestForm.value.jsonContent);
  axios.post(url + "/gateway/" + serverTestForm.value.serviceName + "/" + serverTestForm.value.methodName,
    reqObj)
    .then(response => {
      // 处理成功响应
      ElMessageBox.alert('测试成功！成功转发该服务,返回值为' + response.data, 'Message', {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: 'OK',
        callback: (action: Action) => {
          ElMessage({
            type: 'info',
            message: `action: ${action}`,
          })
        },
      })
    })
    .catch(error => {
      // 处理错误
      console.error("获取失败！", error);
      // 在此处可以处理请求失败后的操作，比如显示错误信息等
      ElMessageBox.alert('转发该服务失败，请检查RPC服务端', 'Message', {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: 'Fail',
        callback: (action: Action) => {
          ElMessage({
            type: 'info',
            message: `action: ${action}`,
          })
        },
      })
    });
}


const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};



</script>
<style scoped>
.box {
  height: 100%;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.card {
  height: 100%;
  width: 100%;
}

.box-card {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form {
  height: 250px;
  width: 500px;
}

.search-button {
  margin-top: 10px; /* 调整的垂直间距，可以根据需求调整该值 */
}
</style>
<style>
.el-tabs__content {
  height: calc(100% - 50px);
  width: 100%;
}

.el-tabs {
  height: 100%;
  width: 100%;
}

.el-tab-pane {
  height: calc(100% - 10px);
}

.el-card {
  height: 100%;
}


</style>

