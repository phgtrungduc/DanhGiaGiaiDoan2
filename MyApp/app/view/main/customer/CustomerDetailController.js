Ext.define("MyApp.view.main.customer.CustomerDetailController", {
  extend: "Ext.app.ViewController",
  alias: "controller.CustomerDetail",
  formatDate: function (jsonDate) {
    let thisDate = new Date(jsonDate);
    return "/Date(" + thisDate.getTime() + ")/";
  },
  validateEmail(email) {
    var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    if (testEmail.test(email)) return true;
    return false;
  },
  show: function (type, data) {
    var me = this;
    var panel = me.getView();
    var viewModel = me.getViewModel();
    switch (type) {
      case "add": {
        this.state = "add";
        Ext.ComponentQuery.query("[xtype='app-main']")[0].mask();
        try {
          Ext.Ajax.request({
            url: "http://localhost:55786/Service/CustomerService.svc/maxcode",
            method: "GET",
            success: function (response) {
              let res = JSON.parse(response.responseText);
              let preFix = res.PreFix;
              let id = res.Value;
              if (data) {
                data.CustomerCode = preFix + id;
                viewModel.setData({ formData: data });
              } else {
                let newForm = viewModel.getData();
                newForm.CustomerCode = preFix + id;
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
      // case "see": {
      //   if (data) {
      //     viewModel.setData({ formData: data });
      //     panel.query("textfield").forEach((element) => {
      //       element.setReadOnly(true);
      //     });
      //   } else {
      //     Ext.Msg.alert(
      //       "Title",
      //       "Chưa có bất kì dòng nào được chọn!",
      //       Ext.emptyFn
      //     );
      //   }
      // }
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
          this.state = "edit";
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
  state: "",
  pressButtonInBottom: function (firstArg) {
    var me = this;
    var window = me.getView();
    var data = me.getViewModel().getData().formData;
    var form = Ext.ComponentQuery.query("#customer-form")[0];
    var grid = Ext.ComponentQuery.query("#grid-customer")[0];
    if (firstArg.state) {
      debugger
      switch (firstArg.state) {
        case "save": {
          if (this.state == "add" || this.state == "saveandadd") {
            let validate = false;
            let formData = { ...data };
            console.log("check");
            if (form.isValid()) {
              if (formData.Email) {
                if (me.validateEmail(formData.Email)) validate = true;
                else {
                  Ext.Msg.alert("Lỗi", "Email chưa đúng định dạng");
                }
              } else {
                validate = true;
              }
            } else {
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
            formData.EditMode = 1;
            delete formData.formData;
            if (validate == true) {
              form.setLoading();
              Ext.Ajax.request({
                url:
                  "http://localhost:55786/Service/CustomerService.svc/customer",
                method: "POST",
                jsonData: {
                  customer: formData,
                },
                success: function (response) {
                  let res = JSON.parse(response.responseText);
                  if (res.code == 1000) {
                    window.closeMe = true;
                    window.close();
                    form.setLoading(false);
                    if (me.state == "saveandadd") me.show("add");
                    grid.getStore().reload();
                    Ext.Msg.alert("Thành công", "Thêm kho thành công");
                  } else {
                    Ext.Msg.alert(
                      "Lỗi",
                      "Đã xảy ra lỗi trong khi thêm kho: " + res.message
                    );
                  }
                },
                failure: function (e) {
                  Ext.Msg.alert(
                    "Lỗi",
                    "Đã xảy ra lỗi trong khi thêm kho: " + e.responseText
                  );
                },
              });
            }
          } else if ((this.state == "edit")) {
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
                  "http://localhost:55786/Service/CustomerService.svc/customer",
                method: "POST",
                jsonData: {
                  customer: formData,
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
                      "Chỉnh sửa kho thành công"
                    );
                  } else {
                    Ext.Msg.alert(
                      "Lỗi",
                      "Đã xảy ra lỗi trong khi thêm kho: " + res.message
                    );
                  }
                },
                failure: function (e) {
                  Ext.Msg.alert(
                    "Lỗi",
                    "Đã xảy ra lỗi trong khi thêm kho: " + e.responseText
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
