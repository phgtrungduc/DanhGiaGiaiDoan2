Ext.define("MyApp.view.main.employee.EmployeeDetailController", {
  extend: "Ext.app.ViewController",
  alias: "controller.EmployeeDetail",
  init: function () {
    console.warn("controller detail");
  },
  validateEmail(email) {
    var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    if (testEmail.test(email)) return true;
    return false;
  },
  formatDate: function (jsonDate) {
    let thisDate = new Date(jsonDate);
    return "/Date(" + thisDate.getTime() + ")/";
  },
  show: function (type, data) {
    console.log("abc");
    debugger
    var me = this;
    var panel = me.getView();
    var viewModel = me.getViewModel();
    switch (type) {
      case "add": {
        Ext.ComponentQuery.query("[xtype='app-main']")[0].mask();
        let edit_button = panel.queryById("edit-button");
        edit_button.setDisabled(true);
        let delete_button = panel.queryById("delete-button");
        delete_button.setDisabled(true);
        let save_button = panel.queryById("save-button");
        save_button.setDisabled(true);

        try {
          Ext.Ajax.request({
            url: "http://localhost:55786/Service/EmployeeService.svc/maxcode",
            method: "GET",
            success: function (response) {
              let res = JSON.parse(response.responseText);
              let preFix = res.PreFix;
              let id = res.Value;
              if (data) {
                data.EmployeeCode = preFix + id;
                viewModel.setData({ formData: data });
              } else {
                let newForm = viewModel.getData();
                newForm.EmployeeCode = preFix + id;
                viewModel.setData({ formData: newForm });
              }
              panel.show();
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
      case "see": {
        let add_button = panel.queryById("add-button");
        add_button.setDisabled(true);
        let save_button = panel.queryById("save-button");
        save_button.setDisabled(true);
        if (data) {
          viewModel.setData({ formData: data });
          panel.query("textfield").forEach((element) => {
            element.setReadOnly(true);
          });
        } else {
          Ext.Msg.alert(
            "Title",
            "Chưa có bất kì dòng nào được chọn!",
            Ext.emptyFn
          );
        }
      }
      case "edit": {
        let add_button = panel.queryById("add-button");
        add_button.setDisabled(true);
        let edit_button = panel.queryById("edit-button");
        edit_button.setDisabled(true);
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
          Ext.ComponentQuery.query("[xtype='app-main']")[0].mask();
          let edit_button = panel.queryById("edit-button");
          edit_button.setDisabled(true);
          let add_button = panel.queryById("add-button");
          add_button.setDisabled(true);
          viewModel.setData({ formData: data });
        }
        break;
    }
    if (data) {
      Ext.ComponentQuery.query("[xtype='app-main']")[0].mask();
      panel.show();
    }
  },
  // handleForm: function () {
  //   var viewModel = this.getViewModel();
  //   var form = viewModel.getData().formData;
  //   Ext.Ajax.request({
  //     url: "http://localhost:55786/Service/EmployeeService.svc/employee",
  //     method: "POST",
  //     jsonData: {
  //       employee: form,
  //     },
  //     success: function (response) {},
  //     failure: function () {
  //       Ext.Msg.alert("Lỗi", "Đã xảy ra lỗi trong khi thêm nhân viên");
  //     },
  //   });
  // },
  pressButtonInToolBar: function (firstArg) {
    var me = this;
    var window = me.getView();
    var data = me.getViewModel().getData().formData;
    var form = Ext.ComponentQuery.query("#employee-form")[0];
    var grid = Ext.ComponentQuery.query("#grid-employee")[0];
    if (firstArg.state) {
      switch (firstArg.state) {
        case "add": {
          let validate = false;
          let formData = { ...data };
          if (form.isValid()) {
            if (formData.Email){
              if (me.validateEmail(formData.Email)) validate = true;
              else {
                Ext.Msg.alert(
                  "Lỗi",
                  "Email chưa đúng định dạng"
                );
              }
            }else {
              validate = true
            }
          }
          else {
            Ext.Msg.alert(
              "Lỗi",
              "Chưa điền đủ các trường bắt buộc hoặc không đúng định dạng"
            );
          }
          if (formData.DateOfBirth) {
            formData.DateOfBirth = this.formatDate(formData.DateOfBirth);
          }
          if (formData.IdentityDate) {
            formData.IdentityDate = this.formatDate(formData.IdentityDate);
          }
          if (formData.JoinDate) {
            formData.JoinDate = this.formatDate(formData.JoinDate);
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
                "http://localhost:55786/Service/EmployeeService.svc/employee",
              method: "POST",
              jsonData: {
                employee: formData,
              },
              success: function (response) {
                let res = JSON.parse(response.responseText);
                if (res.code == 1000) {
                  Ext.Msg.alert("Thành công", "Thêm nhân viên thành công");
                  grid.getStore().reload();
                  window.closeMe = true;
                  window.close();
                } else {
                  form.setLoading(false);
                  Ext.Msg.alert(
                    "Lỗi",
                    "Đã xảy ra lỗi trong khi thêm nhân viên: " + res.message
                  );
                }
              },
              failure: function (e) {
                form.setLoading(false);
                Ext.Msg.alert(
                  "Lỗi",
                  "Đã xảy ra lỗi trong khi thêm nhân viên: " + e.responseText
                );
              },
            });
          }
          break;
        }
        case "edit": {
          break;
        }
        case "save": {
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
          if (formData.IdentityDate) {
            formData.IdentityDate = this.formatDate(formData.IdentityDate);
          }
          if (formData.JoinDate) {
            formData.JoinDate = this.formatDate(formData.JoinDate);
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
                "http://localhost:55786/Service/EmployeeService.svc/employee",
              method: "POST",
              jsonData: {
                employee: formData,
              },
              success: function (response) {
                let res = JSON.parse(response.responseText);
                if (res.code == 1000) {
                  window.closeMe = true;
                  window.close();
                  Ext.Msg.alert("Thành công", "Cập nhật nhân viên thành công");
                  grid.getStore().reload();
                } else {
                  Ext.Msg.alert(
                    "Lỗi",
                    "Đã xảy ra lỗi trong khi cập nhật nhân viên: " + res.message
                  );
                }
              },
              failure: function (e) {
                Ext.Msg.alert(
                  "Lỗi",
                  "Đã xảy ra lỗi trong khi cập nhật nhân viên: " +
                    e.responseText
                );
              },
            });
          }
          break;
        }
        case "delete": {
          form.setLoading();
          Ext.Ajax.request({
            url:
              "http://localhost:55786/Service/EmployeeService.svc/employee/" +
              data.EmployeeId,
            method: "POST",
            success: function (response) {
              let res = JSON.parse(response.responseText);
              if (res == "Success") {
                window.closeMe = true;
                window.close();
                Ext.Msg.alert("Thành công", "Xóa nhân viên thành công");
                grid.getStore().reload();
              } else {
                Ext.Msg.alert("Thất bại", "Xóa nhân viên thất bại");
              }
            },
            failure: function () {
              Ext.Msg.alert("Lỗi", "Đã xảy ra lỗi trong khi xóa nhân viên");
            },
          });
          break;
        }
        case "cancel": {
          window.closeMe = true;
          window.close();
        }
        default:
          break;
      }
    } else {
      Ext.Msg.alert("???", "Hành động???");
    }
  },
});
