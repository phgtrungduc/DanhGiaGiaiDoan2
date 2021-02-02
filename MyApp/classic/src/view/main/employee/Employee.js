Ext.define("MyApp.view.main.employee.Employee", {
  extend: "Ext.container.Container",
  xtype: "employee",
  defaultAlign: "center",
  requires: ["MyApp.view.main.SearchTrigger"],
  controller: "Employee",
  padding: "80 10 10 10",
  layout: "vbox",
  initComponent: function () {
    try {
      var me = this;
      Ext.apply(me, { items: me.getContentItems() });
      this.callParent(arguments);
    } catch (ex) {
      console.error(ex);
    }
  },
  getContentItems: function () {
    var me = this;
    return [
      {
        xtype: "container",
        layout: {
          type: "hbox",
          align: "center",
        },
        width: "100%",
        items: [
          { html: "<h1>Danh mục</h1>", cls: "header-item" },
          {
            cls: "header-item",
            html: "<h2 style='color:rgb(97, 128, 185)' >Nhân viên</h2>",
          },
          {
            html: "<p>Lọc nhanh</p>",
          },
          {
            xtype: "combo",
            label: "Choose one",
            valueField: "value",
            value: "0",
            displayField: "display",
            store: [
              { value: "0", display: "Đang làm việc" },
              { value: "1", display: "Đang thử việc" },
              { value: "2", display: "Đã nghỉ việc" },
            ],
          },
          {
            xtype: "tbfill",
          },
          {
            xtype: "button",
            cls: "m-btn",
            text: "Quay lại thiết lập ban đầu",
          },
          {
            xtype: "button",
            cls: "m-btn",
            text: "Phản hồi",
            style: {
              "margin-left": "10px",
            },
            iconCls: "feedback-button",
          },
        ],
      },
      {
        xtype: "gridpanel",
        columnLines: true,
        flex: "1",
        store: { type: "Employee" },
        itemId: "grid-employee",
        plugins: {
          gridfilters: true,
        },
        listeners: {
          itemdblclick: "selectedItem",
          itemclick: "clickRow",
        },
        columns: [
          {
            text: "Mã nhân viên",
            dataIndex: "EmployeeCode",
            layout: "hbox",
            flex: 1.5,
            cls: "align-center",
            items: [
              {
                xtype: "panel",
                layout: {
                  type: "hbox",

                  align: "stretch",
                },
                padding: "0 5 0 5",
                width: "100%",
                field: "EmployeeCode",
                items: [
                  {
                    xtype: "button",
                    text: "*",
                    width: "100",
                    cls: "m-btn",
                    itemId: "btnFilter",
                    arrowAlign: "left",

                    menu: {
                      xtype: "menu",

                      items: [
                        { text: "* : Chứa", value: "*" },
                        { text: "= : Bằng", value: "=" },
                        { text: "+ : Bắt đầu bằng", value: "+" },
                        { text: "- : Kết thúc bằng", value: "-" },
                        { text: "! : Không chứa", value: "!" },
                      ],
                      listeners: {
                        click: {
                          fn: "changeMenuFilter",
                          scope: "controller",
                        },
                      },
                    },
                  },
                  {
                    xtype: "textfield",
                    flex: 1,
                    listeners: {
                      change: "changeMenuFilter",
                    },
                  },
                ],
              },
            ],
            filter: {
              type: "string",
            },
          },
          {
            text: "Tên nhân viên",
            dataIndex: "FullName",
            flex: 5,
            menuDisabled: true,
            sortable: false,
            cls: "align-center",
            // defaults:{
            //   padding:"0 5 0 5",
            // },
            items: [
              {
                xtype: "panel",
                layout: {
                  type: "hbox",

                  align: "stretch",
                },

                padding: "0 5 0 5",
                width: "100%",
                items: [
                  {
                    xtype: "button",
                    text: "*",
                    width: "100",
                    cls: "m-btn",
                    itemId: "btnFilter",
                    arrowAlign: "left",
                    menu: {
                      xtype: "menu",
                      items: [
                        { text: "* : Chứa", value: "*" },
                        { text: "= : Bằng", value: "=" },
                        { text: "+ : Bắt đầu bằng", value: "+" },
                        { text: "- : Kết thúc bằng", value: "-" },
                        { text: "! : Không chứa", value: "!" },
                      ],
                      listeners: {
                        click: {
                          fn: "changeMenuFilter",
                          scope: "controller",
                        },
                      },
                    },
                  },
                  {
                    xtype: "textfield",
                    flex: 1,
                    listeners: {
                      change: "changeMenuFilter",
                    },
                  },
                ],
              },
            ],
          },
          {
            text: "Số điện thoại",
            dataIndex: "PhoneNumber",
            layout: "hbox",
            flex: 1,
            cls: "align-center",
            menuDisabled: true,
            sortable: false,
            items: [
              {
                xtype: "panel",
                layout: {
                  type: "hbox",

                  align: "stretch",
                },
                padding: "0 5 0 5",
                width: "100%",
                items: [
                  {
                    xtype: "button",
                    text: "*",
                    width: "100",
                    cls: "m-btn",
                    itemId: "btnFilter",
                    arrowAlign: "left",
                    menu: {
                      xtype: "menu",
                      items: [
                        { text: "* : Chứa", value: "*" },
                        { text: "= : Bằng", value: "=" },
                        { text: "+ : Bắt đầu bằng", value: "+" },
                        { text: "- : Kết thúc bằng", value: "-" },
                        { text: "! : Không chứa", value: "!" },
                      ],
                      listeners: {
                        click: {
                          fn: "changeMenuFilter",
                          scope: "controller",
                        },
                      },
                    },
                  },
                  {
                    xtype: "textfield",
                    flex: 1,
                    listeners: {
                      change: "changeMenuFilter",
                    },
                  },
                ],
              },
            ],
          },
          {
            text: "Ngày sinh",
            dataIndex: "DateOfBirth",
            flex: 1.5,
            menuDisabled: true,
            sortable: false,
            align: "center",
            xtype: "datecolumn",
            format: "d/m/Y",
            items: [
              {
                xtype: "panel",
                layout: {
                  type: "hbox",

                  align: "stretch",
                },
                padding: "0 5 0 5",
                width: "100%",
                items: [
                  {
                    xtype: "button",
                    text: "*",
                    width: "100",
                    cls: "m-btn",
                    itemId: "btnFilter",
                    arrowAlign: "left",
                    menu: {
                      xtype: "menu",
                      items: [
                        { text: "* : Chứa", value: "*" },
                        { text: "= : Bằng", value: "=" },
                        { text: "+ : Bắt đầu bằng", value: "+" },
                        { text: "- : Kết thúc bằng", value: "-" },
                        { text: "! : Không chứa", value: "!" },
                      ],
                      listeners: {
                        click: {
                          fn: "changeMenuFilter",
                          scope: "controller",
                        },
                      },
                    },
                  },
                  {
                    xtype: "datefield",
                    flex: 1,
                    listeners: {
                      change: "changeMenuFilter",
                    },
                  },
                ],
              },
            ],
          },
          {
            text: "Trạng thái làm việc",
            dataIndex: "WorkStatus",
            flex: 1.5,
            menuDisabled: true,
            sortable: false,
            cls: "align-center",
            layout: "hbox",
            padding: "0 5 0 5",
            renderer: function (value) {
              if (value === 0) {
                return "Đang thử việc";
              } else return "Chính thức";
            },
            items: [
              {
                xtype: "combo",
                label: "Choose one",
                valueField: "value",
                displayField: "display",
                store: [
                  { value: 0, display: "Đang thử việc" },
                  { value: 1, display: "Chính thức" },
                ],
                width: "100%",
                listeners: {
                  change: "changeMenuFilter",
                },
              },
            ],
          },
          {
            text: "Giới tính",
            dataIndex: "Gender",
            cls: "align-center",
            flex: 1,
            menuDisabled: true,
            sortable: false,
            layout: "hbox",
            fullscreen: true,
            renderer: function (value) {
              if (value === 0) {
                return "Nữ";
              } else if (value === 1) {
                return "Nam";
              } else return "Khác";
            },
            padding: "0 5 0 5",
            items: [
              {
                xtype: "combo",
                label: "Choose one",
                valueField: "value",
                displayField: "display",
                store: [
                  { value: "0", display: "Nữ" },
                  { value: "1", display: "Nam" },
                  { value: "2", display: "Khác" },
                ],
                width: "100%",
                listeners: {
                  change: "changeMenuFilter",
                },
              },
            ],
          },
        ],
        height: "100%",
        width: "100%",
        dockedItems: [
          {
            xtype: "pagingtoolbar", // same store GridPanel is using
            dock: "bottom",
            displayInfo: true,
          },
          {
            xtype: "toolbar",
            dock: "top",

            items: [
              {
                xtype: "button",
                text: "Thêm",
                iconCls: "icon-add",
                state: "add",
                listeners: {
                  click: "selectedItem",
                },
              },
              {
                xtype: "button",
                text: "Nhân bản",
                iconCls: "clone-button",
                state: "clone",
                listeners: {
                  click: "selectedItem",
                },
              },
              {
                xtype: "button",
                text: "Xem",
                iconCls: "see-button",
                state: "see",
                listeners: {
                  click: "selectedItem",
                },
              },
              {
                xtype: "button",
                text: "Sửa",
                iconCls: "edit-button",
                state: "edit",
                listeners: {
                  click: "selectedItem",
                },
              },
              {
                xtype: "button",
                text: "Xóa",
                iconCls: "delete-button",
                state: "delete",
                listeners: {
                  click: "selectedItem",
                },
              },
              { xtype: "tbseparator" },
              {
                xtype: "button",
                text: "Nạp",
                iconCls: "refresh-button",
                state: "refresh",
                listeners: {
                  click: "selectedItem",
                },
              },
              {
                xtype: "button",
                text: "Giúp",

                iconCls: "help-button",
                listeners: {
                  click: "setMasked",
                },
              },
              {
                xtype: "tbfill",
              },
            ],
          },
        ],
      },
      {
        xtype: "tabpanel",
        padding: "10 0 0 0",
        width: "100%",
        style: {
          borderWidth: "1px",
          borderColor: "rgb(211, 211, 211)",
          borderStyle: "solid",
        },
        items: [
          {
            title: "Vai trò",
            xtype: "gridpanel",
            store: [
              {
                namerole: "Quản trị hệ thống",
                description:
                  "Thực hiện tất cả chức năng trên toàn bộ hệ thống CUKCUK.VN",
              },
            ],
            columns: [
              {
                text: "Tên vai trò",
                sortable: false,
                dataIndex: "namerole",
                menuDisabled: true,
                width: "29%",
              },
              {
                text: "Diễn giải",
                sortable: false,
                dataIndex: "description",
                menuDisabled: true,
                width: "69%",
              },
            ],
          },
          {
            title: "Thông tin liên hệ",
            xtype: "container",
            layout: "hbox",
            margin: "5 5 5 5",
            itemId: "ExtraInfor",
            viewModel: {
              type: "ExtraEmployee", // references alias "viewmodel.test"
            },
            items: [
              {
                xtype: "fieldset",
                width: "50%",
                title: "Liên hệ",
                items: [
                  {
                    layout: "hbox",
                    items: [
                      {
                        xtype: "label",
                        text: "Điện thoại di động",
                        padding: "0 50 0 0",
                      },
                      {
                        xtype: "label",
                        bind: "{employee.PhoneNumber}",
                      },
                    ],
                  },
                  {
                    layout: "hbox",
                    items: [
                      {
                        xtype: "label",
                        text: "Điện thoại nhà riêng",
                        padding: "0 50 0 0",
                      },
                      {
                        xtype: "label",
                        bind: "{employee.PhoneHomeNumber}",
                      },
                    ],
                  },
                  {
                    layout: "hbox",
                    items: [
                      {
                        xtype: "label",
                        text: "Email",
                        padding: "0 50 0 0",
                      },
                      {
                        xtype: "label",
                        bind: "{employee.Email}",
                      },
                    ],
                  },
                  {
                    layout: "hbox",
                    items: [
                      {
                        xtype: "label",
                        text: "Địa chỉ",
                        padding: "0 50 0 0",
                      },
                      {
                        xtype: "label",
                        bind: "{employee.Address}",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ];
  },
});
