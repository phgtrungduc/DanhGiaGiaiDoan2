Ext.define("MyApp.view.main.repository.Repository", {
  extend: "Ext.container.Container",
  xtype: "repository",
  defaultAlign: "center",
  width: "100%",
  height: "100%",
  padding: "80 10 10 10",
  layout: "vbox",
  controller: "Repository",
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
    return [
      {
        xtype: "container",
        width: "100%",
        layout: {
          type: "hbox",
          align: "center",
        },

        items: [
          { html: "<h1>Danh mục</h1>", cls: "header-item" },
          {
            cls: "header-item",
            html: "<h2 style='color:rgb(97, 128, 185)' >Kho</h2>",
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
        flex: 1,
        width: "100%",
        store: { type: "Repository" },
        itemId: "grid-repository",
        listeners: {
          itemdblclick: "selectedItem",
        },
        columns: [
          {
            text: "Mã kho",
            dataIndex: "RepositoryCode",
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
                  },
                ],
              }
            ],

            menuDisabled: true,
            sortable: false,
          },
          {
            text: "Tên kho",
            dataIndex: "RepositoryName",
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
                  },
                ],
              },
            ],
          },
          {
            text: "Địa chỉ",
            dataIndex: "Address",
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
                  },
                ],
              },
            ],
          },
        ],
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
              },
              {
                xtype: "button",
                text: "Giúp",

                iconCls: "help-button",
                // listeners: {
                //   click: {
                //     fn: "hideView",
                //     scope: "controller",
                //   },
                // },
              },
              {
                xtype: "tbfill",
              },
            ],
          },
        ],
      },
    ];
  },
});


