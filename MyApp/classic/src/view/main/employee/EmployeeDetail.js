Ext.define("MyApp.view.main.employee.EmployeeDetail", {
  xtype: "EmployeeDetail",
  extend: "Ext.window.Window",
  height: 730,
  width: 1000,
  layout: "fit",
  title: "Nhân viên",
  controller: "EmployeeDetail",
  state: "",
  viewModel: {
    type: "EmployeeDetailModel", // references alias "viewmodel.test"
  },
  listeners: {
    beforeclose: function (win) {
      
      Ext.ComponentQuery.query("[xtype='app-main']")[0].unmask();
      if (win.closeMe) {
        win.closeMe = false;
        
        return true;
      }else if (win.state === "" || win.state === "cancle") {
        Ext.Msg.show({
          width: 500,
          buttonAlign: "right",
          title: "CukCuk - Quản lý nhà hàng",
          msg: "Dữ liệu thay đổi, bạn có muốn cất không?",
          buttonText: { no: "Có", yes: "Không", cancel: "Hủy bỏ" },
          callback: function (btn) {
            if (btn === "yes") {
              win.closeMe = true;
              win.close();
            } else if (btn === "no") {
              win.getController().pressButtonInToolBar({ state: "add" });
            }
          },
        });
      }
      return false;
      
    },
  },
  initComponent: function () {
    try {
      var me = this;
      Ext.apply(me, { items: me.getContentItems() });

      this.callParent(arguments);
    } catch (ex) {
      console.error(ex);
    }
  },
  style: {
    "background-color": "white",
  },
  itemId: "EmployeeFormDetail",
  tbar: [
    {
      xtype: "toolbar",
      layout: "hbox",
      items: [
        {
          xtype: "button",
          cls: "m-btn right-10",
          text: "Thêm",
          iconCls: "icon-add",
          itemId: "add-button",
          state: "add",
          handler: "pressButtonInToolBar",
        },
        {
          xtype: "button",
          text: "Sửa",
          cls: "m-btn right-10",
          itemId: "edit-button",
          iconCls: "edit-button",
          state: "edit",
          handler: "pressButtonInToolBar",
        },

        {
          xtype: "splitbutton",
          text: "Cất",
          cls: "m-btn right-10",
          itemId: "save-button",
          iconCls: "save-button",
          state: "save",
          handler: "pressButtonInToolBar",
        },
        {
          xtype: "button",
          text: "Xóa",
          itemId: "delete-button",
          cls: "m-btn right-10",
          iconCls: "delete-button",
          state: "delete",
          handler: "pressButtonInToolBar",
        },
        {
          xtype: "tbseparator",
        },
        {
          xtype: "button",
          text: "Giúp",

          cls: "m-btn right-10",
          iconCls: "help-button",
        },
        {
          xtype: "button",
          text: "Đóng",
          cls: "m-btn right-10",
          iconCls: "close-button",
          state:"cancel",
          handler: "pressButtonInToolBar",
        },
      ],
    },
  ],
  getContentItems: function () {
    return {
      xtype: "tabpanel",
      padding: "0 5 0 5",
      defaults: {
        bodyPadding: "5 0 0 0",
      },
      items: [
        {
          title: "Thông tin chung",
          xtype: "form",
          layout: {
            type: "hbox",
          },
          cls: "detail-form",
          itemId: "employee-form",
          items: [
            {
              flex: 7,
              items: [
                {
                  layout: {
                    type: "hbox",
                    pack: "start",
                    align: "stretch",
                  },
                  padding: "0 0 5 0",
                  items: [
                    {
                      xtype: "textfield",
                      fieldLabel: "Mã nhân viên (*)",
                      name: "EmployeeCode",
                      labelWidth: 150,
                      flex: 1,
                      width: 500,
                      bind: "{formData.EmployeeCode}",
                      allowBlank: false,
                      readOnly: true,
                      blankText: "Trường này bắt buộc phải điền",
                    },
                    {
                      padding: "0 0 0 10",
                      html:
                        "<i>Dùng làm tên đăng nhập vào hệ thống, có thể sử dụng số điện thoại hoặc email cho dễ nhớ.</i>",
                      style: {
                        "font-size": "10px!important",
                      },
                      flex: 1,
                    },
                  ],
                },
                {
                  layout: {
                    type: "hbox",
                    pack: "start",
                    align: "stretch",
                  },
                  padding: "0 0 5 0",
                  items: [
                    {
                      xtype: "textfield",
                      fieldLabel: "Email(*)",
                      name: "Email",
                      labelWidth: 150,
                      flex: 3,
                      bind: "{formData.Email}",
                      padding: "0 10 0 0",
                    },
                    {
                      xtype: "tbfill",
                      flex: 2,
                    },
                  ],
                },
                {
                  layout: {
                    type: "hbox",
                    pack: "start",
                    align: "stretch",
                  },
                  padding: "0 0 5 0",
                  items: [
                    {
                      xtype: "textfield",
                      fieldLabel: "Số điện thoại(*)",
                      name: "PhoneNumber",
                      labelWidth: 150,
                      flex: 3,
                      bind: "{formData.PhoneNumber}",
                      padding: "0 10 0 0",
                      allowBlank: false,
                      blankText: "Trường này bắt buộc phải điền",
                      // validator: function (val) {
                      //   // var tn = val.replace(/[^0-9]/g, ""),
                      //    let  errMsg = true ;
                      //    if (!val) errMsg = "Số điện thoại không được bỏ trống";
                      //   return errMsg;
                      // },
                    },
                    {
                      xtype: "tbfill",
                      flex: 2,
                    },
                  ],
                },
                {
                  layout: {
                    type: "hbox",
                    pack: "start",
                    align: "stretch",
                  },
                  padding: "0 0 5 0",
                  items: [
                    {
                      xtype: "textfield",
                      fieldLabel: "Họ và tên (*)",
                      name: "FullName",
                      labelWidth: 150,
                      flex: 100,
                      bind: "{formData.FullName}",
                      allowBlank: false,
                      blankText: "Trường này bắt buộc phải điền",
                      // renderer:function(value, displayField){
                      //   return "1"
                      // }
                    },
                  ],
                },
                {
                  layout: {
                    type: "hbox",
                    pack: "start",
                    align: "stretch",
                  },
                  padding: "0 0 5 0",
                  items: [
                    {
                      xtype: "combo",
                      fieldLabel: "Giới tính",
                      label: "Choose one",
                      valueField: "value",
                      displayField: "display",
                      padding: "0 10 0 0",
                      labelWidth: 150,
                      flex: 3,
                      value: 0,
                      // store: [
                      //   { value: "0", display: "Nam" },
                      //   { value: "1", display: "Nữ" },
                      // ],
                      width: "100%",
                      bind: {
                        value: "{formData.Gender}",
                        // selection: '{database.language_default}',
                        store: [
                          { value: 0, display: "Nữ" },
                          { value: 1, display: "Nam" },
                          { value: 2, display: "Khác" },
                        ],
                      },
                    },
                    // {
                    //   xtype: "textfield",
                    //   fieldLabel: "Giới tính",
                    //   name: "Gender",
                    //   labelWidth: 150,
                    //   flex: 3,
                    //   bind: "{formData.Gender}",
                    //   padding: "0 10 0 0",
                    //   render: function (value) {
                    //     console.log(value);
                    //     if (value === 0) {
                    //       return "Nữ";
                    //     } else if (value === 1) {
                    //       return "Nam";
                    //     } else return "Khác";
                    //   },
                    // },
                    {
                      xtype: "datefield",
                      fieldLabel: "Ngày sinh",
                      name: "DateOfBirth",
                      labelWidth: 100,
                      flex: 2,
                      bind: "{formData.DateOfBirth}",
                    },
                  ],
                },
                {
                  layout: {
                    type: "hbox",
                    pack: "start",
                    align: "stretch",
                  },
                  padding: "0 0 5 0",
                  items: [
                    {
                      xtype: "textfield",
                      fieldLabel: "Số CMND(*)",
                      name: "IdentityNumber",
                      labelWidth: 150,
                      flex: 3,
                      bind: "{formData.IdentityNumber}",
                      padding: "0 10 0 0",
                      allowBlank: false,
                      blankText: "Trường này bắt buộc phải điền",
                    },
                    {
                      xtype: "datefield",
                      fieldLabel: "Ngày cấp",
                      name: "IdentityDate",
                      labelWidth: 100,
                      flex: 2,
                      bind: "{formData.IdentityDate}",
                    },
                  ],
                },
                {
                  layout: {
                    type: "hbox",
                    pack: "start",
                    align: "stretch",
                  },
                  padding: "0 0 5 0",
                  items: [
                    {
                      xtype: "textfield",
                      fieldLabel: "Nơi cấp CMND",
                      name: "IdentityPlace",
                      labelWidth: 150,
                      flex: 100,
                      bind: "{formData.IdentityPlace}",
                    },
                  ],
                },
                {
                  layout: {
                    type: "hbox",
                    pack: "start",
                    align: "stretch",
                  },
                  items: [
                    {
                      xtype: "combo",
                      fieldLabel: "Trạng thái làm việc",
                      valueField: "value",
                      displayField: "display",
                      padding: "0 10 0 0",
                      labelWidth: 150,
                      flex: 1,
                      width: 500,
                      value: 0,
                      width: "100%",
                      bind: {
                        value: "{formData.WorkStatus}",
                        // selection: '{database.language_default}',
                        store: [
                          { value: 0, display: "Đang thử việc" },
                          { value: 1, display: "Chính thức" },
                        ],
                      },
                      },
                      {
                        padding: "0 0 0 10",
                        xtype: "checkboxfield",
                        name: "AllowRight",
                        value: "tomato",
                        checked: true,
                        boxLabel: "Cho phép làm việc với phần mềm CukCuk",
                        flex: 1,
                      },
                  ],
                },
              ],

              // Reset and Submit buttons
            },
            {
              flex: 2,
              style: {
                "margin-left": " 15px",
                "margin-top": " 5px",
              },
              items: [
                {
                  xtype: "image",
                  src: "/images/image-user.png",
                  width: "134px",
                  height: "134px",
                },
                {
                  html:
                    "<span>Chỉ được upload file<span><b>.jpg, .jpeg, .png, .gif</b>",
                },
              ],
            },
          ],
        },

        {
          title: "Thông tin liên hệ",
          defaults: {
            width: "100%",
          },
          xtype: "form",
          items: [
            {
              xtype: "textfield",
              fieldLabel: "Điện thoại nhà riêng",
              name: "PhoneHomeNumber",
              labelWidth: 150,
              bind: "{formData.HomePhoneNumber}",
            },
            {
              xtype: "fieldset",
              title: "Liên hệ khẩn cấp",
              layout: "hbox",

              width: "calc(100% - 3px)",

              items: [
                {
                  xtype: "panel",
                  defaults: {
                    width: "100%",
                  },
                  padding: "0 10 0 0",
                  items: [
                    {
                      xtype: "textfield",
                      fieldLabel: "Họ và tên",
                      name: "FullName",
                      labelWidth: 150,
                      bind: "{formData.FullName}",
                    },
                    {
                      xtype: "textfield",
                      fieldLabel: "Quan hệ",
                      name: "Relationship",
                      labelWidth: 150,
                    },
                    {
                      xtype: "textfield",
                      fieldLabel: "Điện thoại di động",
                      name: "PhoneNumber",
                      labelWidth: 150,
                      bind: "{formData.PhoneNumber}",
                    },
                    {
                      xtype: "textfield",
                      fieldLabel: "Điện thoại nhà riêng",
                      name: "PhoneHomeNumber",
                      labelWidth: 150,
                      bind: "{formData.PhoneHomeNumber}",
                    },
                  ],
                  flex: 1,
                },
                {
                  defaults: {
                    width: "100%",
                  },
                  items: [
                    {
                      xtype: "textfield",
                      fieldLabel: "Email",
                      name: "Email",
                      labelWidth: 150,
                      bind: "{formData.Email}",
                      allowBlank: false,
                      blankText: "Trường này bắt buộc phải điền",
                    },
                    {
                      xtype: "textareafield",
                      fieldLabel: "Địa chỉ",
                      name: "Address",
                      labelWidth: 150,
                      bind: "{formData.Address}",
                    },
                  ],
                  flex: 1,
                },
              ],
            },
            {
              layout: "hbox",
              width: "100%",
              items: [
                {
                  xtype: "fieldset",
                  title: "Hộ khẩu thường trú",
                  flex: 7,
                  defaults: {
                    width: "100%",
                  },
                  items: [
                    {
                      xtype: "textareafield",
                      fieldLabel: "Địa chỉ",
                      name: "Address",
                      labelWidth: 150,
                      grow: true,
                      bind: "{formData.Address}",
                    },
                    {
                      xtype: "textfield",
                      fieldLabel: "Quốc gia",
                      name: "Nationality",
                      labelWidth: 150,
                      bind: "{formData.Nationality}",
                    },
                    {
                      xtype: "textfield",
                      fieldLabel: "Tỉnh/TP",
                      name: "City",
                      labelWidth: 150,
                      bind: "{formData.City}",
                    },
                    {
                      xtype: "textfield",
                      fieldLabel: "Quận/Huyện",
                      name: "District",
                      labelWidth: 150,
                      bind: "{formData.District}",
                    },
                    {
                      xtype: "textfield",
                      fieldLabel: "Xã/Phường",
                      name: "Ward",
                      labelWidth: 150,
                      bind: "{formData.Ward}",
                    },
                  ],
                },
                {
                  xtype: "panel",
                  flex: 1,
                  height: "100%",
                  layout: {
                    type: "hbox",
                    align: "center",
                    pack: "center",
                  },
                  items: [
                    {
                      xtype: "button",
                      border: "1px solid black",
                      iconCls: "arrow-button",
                      width: "50px",
                    },
                  ],
                },
                {
                  xtype: "fieldset",
                  title: "Chỗ ở hiện tại",
                  flex: 7,
                  defaults: {
                    width: "100%",
                  },
                  items: [
                    {
                      xtype: "textareafield",
                      fieldLabel: "Địa chỉ",
                      name: "Address",
                      labelWidth: 150,
                      grow: true,
                    },
                    {
                      xtype: "textfield",
                      fieldLabel: "Quốc gia",
                      name: "Nationality",
                      labelWidth: 150,
                    },
                    {
                      xtype: "textfield",
                      fieldLabel: "Tỉnh/TP",
                      name: "City",
                      labelWidth: 150,
                    },
                    {
                      xtype: "textfield",
                      fieldLabel: "Quận/Huyện",
                      name: "City",
                      labelWidth: 150,
                    },
                    {
                      xtype: "textfield",
                      fieldLabel: "Xã/Phường",
                      name: "Street",
                      labelWidth: 150,
                    },
                  ],
                },
              ],
            },
          ],
        },

        {
          title: "Thông tin khác",
          layout: "hbox",
          xtype: "form",
          items: [
            {
              flex: 1,
              defaults: {
                width: "100%",
              },

              padding: "0 10 0 0",
              items: [
                {
                  xtype: "datefield",
                  fieldLabel: "Ngày thử việc",
                  name: "Street",
                  labelWidth: 150,
                },
                {
                  xtype: "datefield",
                  fieldLabel: "Ngày chính thức",
                  name: "JoinDate",
                  labelWidth: 150,
                  bind: "{formData.JoinDate}",
                },
              ],
            },
            {
              flex: 1,
              defaults: {
                width: "100%",
              },
              items: [
                {
                  xtype: "textfield",
                  fieldLabel: "Mức lương",
                  name: "Street",
                  labelWidth: 150,
                  bind: "{formData.Salary}",
                },
                {
                  xtype: "textfield",
                  fieldLabel: "Tình trạng hôn nhân",
                  name: "Street",
                  labelWidth: 150,
                },
              ],
            },
          ],
        },
      ],
    };
  },
});
