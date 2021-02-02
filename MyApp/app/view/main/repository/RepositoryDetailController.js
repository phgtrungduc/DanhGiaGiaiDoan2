Ext.define("MyApp.view.main.repository.RepositoryDetailController", {
  extend: "Ext.app.ViewController",
  alias: "controller.RepositoryDetail",
  formatDate: function (jsonDate) {
    let thisDate = new Date(jsonDate);
    return "/Date(" + thisDate.getTime() + ")/";
  },
  init:function(){
    debugger
  },
  state: "",
  show: function (type, data) {
    var me = this;
    var panel = me.getView();
    var viewModel = me.getViewModel();
    switch (type) {
      case "add": {
        me.state = "add";
        Ext.ComponentQuery.query("[xtype='app-main']")[0].mask();
        try {
          Ext.Ajax.request({
            url: "http://localhost:55786/Service/RepositoryService.svc/maxcode",
            method: "GET",
            success: function (response) {
              let res = JSON.parse(response.responseText);
              let preFix = res.PreFix;
              let id = res.Value;
              if (data){
                data.RepositoryCode = preFix + id;
                viewModel.setData({ formData: data });
                panel.show();
              }else {
                if (me.state=="saveandadd") {
                  me.state="add";
                  let panel = Ext.create(
                    "MyApp.view.main.repository.RepositoryDetail"
                  );
                  let viewModel = panel.getViewModel();
                  viewModel.setData({
                    formData: { RepositoryCode: preFix + id },
                  });
                  panel.show();
                } else {
                  let viewModel = panel.getViewModel();
                  viewModel.setData({
                    formData: { RepositoryCode: preFix + id },
                  });
                  panel.show();
                }
              }
              
            },
            failure: function () {
              Ext.Msg.alert("Lỗi", "Đã xảy ra lỗi");
            },
          });
        } catch (error) {
          Ext.Msg.alert("Lỗi", "Đã xảy ra lỗi");
        }
        break;
      }
      case "edit": {
        this.state = "edit";
        let save_add_button = panel.queryById("save_add_button");
        save_add_button.setDisabled(true);
        // myMask = new Ext.LoadMask({
        //   msg: "Please wait...",
        //   target: Ext.getBody(),
        // });
        if (data) {
          viewModel.setData({ formData: data });
        } else {
          Ext.Msg.alert(
            "Title",
            "Chưa có bất kì dòng nào được chọn!",
            Ext.emptyFn
          );
        }
        break;
      }
      default:
        {
          me.state = "edit";
          let save_add_button = panel.queryById("save_add_button");
          save_add_button.setDisabled(true);
          viewModel.setData({ formData: data });
        }
        break;
    }
    if (data) {
      Ext.ComponentQuery.query("[xtype='app-main']")[0].mask();
      panel.show();
    }
  },
  
  pressButtonInBottom: function (firstArg) {
    var me = this;
    var window = me.getView();
    var data = me.getViewModel().getData().formData;
    var form = Ext.ComponentQuery.query("#repository-form")[0];
    var grid = Ext.ComponentQuery.query("#grid-repository")[0];
    if (firstArg.state) {
      switch (firstArg.state) {
        case "save": {
          if (me.state == "add" || me.state == "saveandadd") {
            let validate = false;
            let formData = { ...data };
            debugger;
            console.log("debug");
            if (form.isValid()) validate = true;
            else {
              Ext.Msg.alert(
                "Lỗi",
                "Chưa điền đủ các trường bắt buộc hoặc không đúng định dạng"
              );
            }
            if (formData.ModifiedDate) {
              formData.ModifiedDate = this.formatDate(formData.ModifiedDate);
            }
            formData.EditMode = 1;
            delete formData.formData;
            if (validate == true) {
              form.setLoading();
              Ext.Ajax.request({
                url:
                  "http://localhost:55786/Service/RepositoryService.svc/repository",
                method: "POST",
                jsonData: {
                  repository: formData,
                },
                success: function (response) {
                  let res = JSON.parse(response.responseText);
                  if (res.code == 1000) {
                    window.closeMe = true;
                    window.close();
                    form.setLoading(false);
                    if (me.state == "saveandadd") me.show("add");
                    grid.getStore().reload();
                    Ext.Msg.alert("Thành công", "Thêm khách hàng thành công");
                  } else {
                    form.setLoading(false);
                    Ext.Msg.alert(
                      "Lỗi",
                      "Đã xảy ra lỗi trong khi thêm khách hàng: " + res.message
                    );
                  }
                },
                failure: function (e) {
                  form.setLoading(false);
                  Ext.Msg.alert(
                    "Lỗi",
                    "Đã xảy ra lỗi trong khi thêm khách hàng: " + e.responseText
                  );
                },
              });
            }
          } else if ((me.state == "edit")) {
            let validate = false;
            let formData = { ...data };
            if (form.isValid()) validate = true;
            else {
              Ext.Msg.alert(
                "Lỗi",
                "Chưa điền đủ các trường bắt buộc hoặc không đúng định dạng"
              );
            }
            if (formData.DateOfBirth) {
              formData.DateOfBirth = this.formatDate(formData.DateOfBirth);
            }
            if (formData.ModifiedDate) {
              formData.ModifiedDate = this.formatDate(formData.ModifiedDate);
            }
            formData.EditMode = 3;
            delete formData.formData;
            if (validate == true) {
              form.setLoading();
              Ext.Ajax.request({
                url:
                  "http://localhost:55786/Service/RepositoryService.svc/repository",
                method: "POST",
                jsonData: {
                  repository: formData,
                },
                success: function (response) {
                  let res = JSON.parse(response.responseText);
                  if (res.code == 1000) {
                    window.closeMe = true;
                    window.close();
                    form.setLoading(false);
                    grid.getStore().reload();
                    Ext.Msg.alert(
                      "Thành công",
                      "Chỉnh sửa khách hàng thành công"
                    );
                  } else {
                    form.setLoading(false);
                    Ext.Msg.alert(
                      "Lỗi",
                      "Đã xảy ra lỗi trong khi thêm khách hàng: " + res.message
                    );
                  }
                },
                failure: function (e) {
                  form.setLoading(false);
                  Ext.Msg.alert(
                    "Lỗi",
                    "Đã xảy ra lỗi trong khi thêm khách hàng: " + e.responseText
                  );
                },
              });
            }
          } else {
            Ext.Msg.alert("Lỗi", "Đã xảy ra lỗi");
          }
          // window.state = "save";
          // window.closeMe = true;
          // window.close();
          break;
        }
        case "saveandadd": {
          this.state = "saveandadd";
          this.pressButtonInBottom({ state: "save" });
          window.state = "saveandadd";
          break;
        }
        case "cancle": {
          window.state = "cancle";
          window.closeMe = true;
          window.close();
          break;
        }
        default:
          break;
      }
    } else {
      Ext.Msg.alert("???", "Hành động???");
    }
  },
});
