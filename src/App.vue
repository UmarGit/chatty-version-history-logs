<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" app clipped >
      <v-list dense>
        <v-list-item v-for="(item, i) in items" :key="i" link>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <template v-if="item.text == 'Inbox'">
            <v-list-item-title
              @click="
                InboxModal = !InboxModal;
                BulkModal = false;
                HistoryModal = false;
                SentModal = false;
              "
            >
              {{ item.text }}
            </v-list-item-title>
          </template>
          <template v-if="item.text == 'Bulk SMS'">
            <v-list-item-title
              @click="
                BulkModal = !BulkModal;
                InboxModal = false;
                HistoryModal = false;
                SentModal = false;
              "
            >
              {{ item.text }}
            </v-list-item-title>
          </template>
          <template v-if="item.text == 'History'">
            <v-list-item-title
              @click="
                HistoryModal = !HistoryModal;
                InboxModal = false;
                BulkModal = false;
                SentModal = false;
                RetriveLogAll();
              "
            >
              {{ item.text }}
            </v-list-item-title>
          </template>
          <template v-if="item.text == 'Sent'">
            <v-list-item-title
              @click="
                SentModal = !SentModal;
                InboxModal = false;
                BulkModal = false;
                HistoryModal = false;
              "
            >
              {{ item.text }}
            </v-list-item-title>
          </template>
          <template v-if="item.text == 'Settings'">
            <v-list-item-title @click="SettingsModal = !SettingsModal">
              {{ item.text }}
            </v-list-item-title>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="red" dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="mr-12 align-center">
        <span class="title">Twilio SMS Portal</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container class="fill-height">
        <!-- inbox -->
        <v-container v-show="InboxModal">
          <v-row dense>
            <v-col cols="12">
              <v-alert
                v-model="sendingAlert"
                dismissible
                close-icon="mdi-delete"
                color="pink"
                border="left"
                elevation="10"
                colored-border
                icon="mdi-send"
              >
                Alert ! <strong>{{ messageStatus }}</strong
                >.
              </v-alert>
            </v-col>
            <v-col cols="12">
              <v-card color="pink" dark>
                <v-card-title class="headline">Inbox</v-card-title>
                <v-card-subtitle
                  >You can check the sent messages and recieved
                  messages</v-card-subtitle
                >
                <v-card-actions>
                  <v-btn
                    absolute
                    dark
                    fab
                    top
                    right
                    color="green"
                    @click="openSend()"
                  >
                    <v-icon>mdi-send</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col class="inboxClick" v-for="(person, i) in contactsnoDUP" :key="i" cols="12">
              <v-card :color="person.color" dark>
                <div class="d-flex flex-no-wrap justify-space-between">
                  <div>
                    <v-card-title
                      class="headline"
                      v-text="person.number"
                    ></v-card-title>
                    <v-card-subtitle
                      ><strong>{{ person.message }}</strong
                      ><br /><small v-text="person.time"></small
                    ></v-card-subtitle>
                    <v-card-actions>
                      <v-btn
                        @click="personalSend(person.number)"
                        fab
                        dark
                        small
                        absolute
                        bottom
                        left
                        color="red"
                      >
                        <v-icon>mdi-send</v-icon>
                      </v-btn>
                      <v-btn
                        @click="chat(person.number)"
                        @mouseover="updateBD(i)"
                        fab
                        dark
                        small
                        absolute
                        bottom
                        right
                        color="orange"
                      >
                        <v-badge
                          :content="person.messagecount"
                          :value="person.messagecount"
                          color="green"
                        >
                          <v-icon>mdi-chat</v-icon>
                        </v-badge>
                      </v-btn>
                    </v-card-actions>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        <!-- bulk -->
        <v-row justify="center" v-show="BulkModal">
        </v-row>
        <!-- history -->
        <v-row justify="center" v-show="HistoryModal">
          <v-col justify="center" cols="12">
            <v-card>
              <v-card-title>
                <span class="headline">All Incoming Messages</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="limitToshowAll"
                        label="Limit *"
                        maxlength="100"
                        counter="100"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <slot v-for="uniq in contactsLogAll" cols="12">
                        <template>
                          <v-card class="deco" :color="uniq.color" dark>
                            <div
                              class="d-flex flex-no-wrap justify-space-between"
                            >
                              <div>
                                <v-card-title class="headline"
                                  >{{ uniq.number }} (
                                  {{ uniq.status }} )</v-card-title
                                >
                                <v-card-subtitle
                                  ><strong>{{ uniq.message }}</strong
                                  ><br /><small v-text="uniq.time"></small
                                ></v-card-subtitle>
                                <v-card-actions>
                                  <v-btn
                                    @click="personalSend(uniq.number)"
                                    fab
                                    dark
                                    small
                                    absolute
                                    bottom
                                    right
                                    color="grey"
                                  >
                                    <v-icon>mdi-send</v-icon>
                                  </v-btn>
                                </v-card-actions>
                              </div>
                            </div>
                          </v-card>
                        </template>
                      </slot>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="HistoryModal = !HistoryModal"
                  >Close</v-btn
                >
                <v-btn
                  color="blue darken-1"
                  text
                  @click="contactsLogAll = []"
                  >Clear</v-btn
                >
                <v-btn
                  :loading="loadingLogAll"
                  :disabled="loadingLogAll"
                  @click="(loader = 'loadingLogAll'), RetriveLogAll()"
                  color="blue darken-1"
                  text
                >
                  Check Log All
                  <v-icon right dark> mdi-history </v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col justify="center" cols="12">
            <v-card>
              <v-card-title>
                <span class="headline">Single User Messages ( Incoming and Delivered )</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="userNum"
                        label="User Number *"
                        maxlength="34"
                        counter="34"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="limitToshow"
                        label="Limit *"
                        maxlength="100"
                        counter="100"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <slot v-for="uniq in contactsLog" cols="12">
                        <template>
                          <v-card class="deco" :color="uniq.color" dark>
                            <div
                              class="d-flex flex-no-wrap justify-space-between"
                            >
                              <div>
                                <v-card-title class="headline"
                                  >{{ uniq.number }} (
                                  {{ uniq.status }} )</v-card-title
                                >
                                <v-card-subtitle
                                  ><strong>{{ uniq.message }}</strong
                                  ><br /><small v-text="uniq.time"></small
                                ></v-card-subtitle>
                                <v-card-actions>
                                  <v-btn
                                    @click="personalSend(uniq.number)"
                                    fab
                                    dark
                                    small
                                    absolute
                                    bottom
                                    right
                                    color="grey"
                                  >
                                    <v-icon>mdi-send</v-icon>
                                  </v-btn>
                                </v-card-actions>
                              </div>
                            </div>
                          </v-card>
                        </template>
                      </slot>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="HistoryModal = !HistoryModal"
                  >Close</v-btn
                >
                <v-btn
                  color="blue darken-1"
                  text
                  @click="contactsLog = []"
                  >Clear</v-btn
                >
                <v-btn
                  :loading="loadingLog"
                  :disabled="loadingLog"
                  @click="(loader = 'loadingLog'), RetriveLog()"
                  color="blue darken-1"
                  text
                >
                  Check Log
                  <v-icon right dark> mdi-history </v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <!-- Sent -->
        <v-row justify="center" v-show="SentModal">
          <v-card>
            <v-card-title>
              <span class="headline">You Have Sent Messages To The Following</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col col="12">
                    <slot v-for="uniq in bulklistSent" cols="12">
                      <template>
                        <v-card class="deco" :color="uniq.color" dark>
                          <div class="d-flex flex-no-wrap justify-space-between">
                            <div>
                              <v-card-title
                                class="headline"
                                v-text="uniq.number"
                              ></v-card-title>
                              <v-card-subtitle>
                                <strong>{{ uniq.message }} ( Sent )</strong>
                              </v-card-subtitle>
                              <v-card-actions>
                                <v-btn
                                  @click="personalSend(uniq.number)"
                                  fab
                                  dark
                                  small
                                  absolute
                                  bottom
                                  right
                                  color="grey"
                                >
                                  <v-icon>mdi-send</v-icon>
                                </v-btn>
                              </v-card-actions>
                            </div>
                          </div>
                        </v-card>
                      </template>
                    </slot>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="SentModal = !SentModal"
                >Close</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-row>
        <!-- setting -->
        <v-row justify="center">
          <v-dialog v-model="SettingsModal" persistent max-width="600px">
            <v-card>
              <v-card-title>
                <span class="headline">Twilio Credentials</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="myNumber"
                        label="My Number *"
                        counter="60"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="twilioSsid"
                        label="Twilio Account SSID *"
                        maxlength="34"
                        counter="34"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="twilioAuthToken"
                        label="Twilio Auth Token*"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="show1 = !show1"
                        :type="show1 ? 'text' : 'password'"
                        counter="32"
                        maxlength="32"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="SettingsModal = !SettingsModal"
                  >Close</v-btn
                >
                <v-btn
                  color="blue darken-1"
                  text
                  @click="setCredentials(twilioSsid, twilioAuthToken, myNumber)"
                  >Save</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
        <!-- sending -->
        <v-row justify="center">
          <v-dialog v-model="SendingModal" persistent max-width="600px">
            <v-card>
              <v-card-title>
                <span class="headline">Send A Message</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="myNumber"
                        label="My Number *"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="userNum"
                        label="User Number *"
                        maxlength="34"
                        counter="34"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        v-model="sinMessage"
                        name="input-7-1"
                        label="Message *"
                        value=""
                        :hint="'Send the message to ' + userNum"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="SendingModal = !SendingModal"
                  >Close</v-btn
                >
                <v-btn color="blue darken-1" text @click="SendSingle()"
                  >Send</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
        <!-- Inside INBOX -->
        <v-row justify="center">
          <v-dialog v-model="InsideModal" max-width="600px">
            <slot v-for="uniq in contacts" cols="12">
              <template v-if="uniq.number == selectednum">
                <v-card class="deco" :color="uniq.color" dark>
                  <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                      <v-card-title
                        class="headline"
                        v-text="uniq.number"
                      ></v-card-title>
                      <v-card-subtitle
                        ><strong>{{ uniq.message }}</strong
                        ><br /><small v-text="uniq.time"></small
                      ></v-card-subtitle>
                      <v-card-actions>
                        <v-btn
                          @click="personalSend(uniq.number)"
                          fab
                          dark
                          small
                          absolute
                          bottom
                          right
                          color="grey"
                        >
                          <v-icon>mdi-send</v-icon>
                        </v-btn>
                      </v-card-actions>
                    </div>
                  </div>
                </v-card>
              </template>
            </slot>
          </v-dialog>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String,
  },
  data() {
    return {
      loader: null,
      loadingUpload: false,
      loadingLog: false,
      loadingLogAll: false,
      fab: false,
      drawer: null,
      sendingAlert: false,
      twilioAuthToken: "",
      messageStatus: "Message Send Successfully !",
      twilioSsid: "",
      myNumber: "",
      userNum: "",
      sinMessage: "",
      mulMessage: "",
      mulContacts: "",
      showAddSuccessMessage: "",
      showAddSuccess: false,
      show1: false,
      selectednum: "",
      InboxModal: true,
      SentModal: false,
      BulkModal: false,
      InsideModal: false,
      SendingModal: false,
      SettingsModal: false,
      HistoryModal: false,
      limitToshow: 10,
      limitToshowAll: 10,
      items: [
        { icon: "mdi-send", text: "Inbox" },
        { icon: "mdi-youtube-subscription", text: "Bulk SMS" },
        { icon: "mdi-history", text: "History" },
        { icon: "mdi-message-reply", text: "Sent" },
        { icon: "mdi-cog", text: "Settings" },
      ],
      bulklist: [],
      bulklistSent: [],
      contacts: [],
      contactsLog: [],
      contactsLogAll: [],
      contactsnoDUP: [],
      checkArrays: [],
      CsvData: []
    };
  },
  methods: {
    setCredentials(twilioSsid, twilioAuthToken, myNumber) {
      localStorage.setItem("twilioSSID", twilioSsid);
      localStorage.setItem("twilioAuthToken", twilioAuthToken);
      localStorage.setItem("myNumber", myNumber);
      this.SettingsModal = false;
    },
    updateBD(index) {
      this.contactsnoDUP[index].messagecount = this.checkArrays[index].counter;
    },
    getUnique() {
      const unique = this.contacts
        .map((e) => e["number"])

        .map((e, i, final) => final.indexOf(e) === i && i)

        .filter((e) => this.contacts[e])
        .map((e) => this.contacts[e]);

      this.contactsnoDUP = unique;
      this.checkArray();
    },
    checkArray() {
      this.checkArrays = [];
      this.contactsnoDUP.forEach((element1) => {
        var count = 0;
        this.contacts.forEach((element2) => {
          if (element2.number == element1.number) {
            count++;
          }
        });
        let obj = {
          name: element1.number,
          counter: count,
        };
        this.checkArrays.push(obj);
      });
    },
    openSend() {
      this.userNum = "";
      this.SendingModal = !this.SendingModal;
    },
    update() {
      this.twilioSsid = localStorage.twilioSSID;
      this.twilioAuthToken = localStorage.twilioAuthToken;
      this.myNumber = localStorage.myNumber;
      if (localStorage.listofconversation) {
        this.contacts = JSON.parse(
          localStorage.getItem("listofconversation") || "[]"
        );
      }
      if (localStorage.sent) {
        this.bulklistSent = JSON.parse(
          localStorage.getItem("sent") || "[]"
        );
      }
    },
    SendSingle() {
      const accountSid = this.twilioSsid;
      const authToken = this.twilioAuthToken;
      const client = require("twilio")(accountSid, authToken);

      client.messages
        .create({
          body: this.sinMessage,
          from: this.myNumber,
          to: this.userNum,
        })
        .then(
          (message) => (this.messageStatus = message.status),
          (this.sendingAlert = true),
          (this.SendingModal = false)
        );
      var timestamp = new Date();
      var obj = {
        color: "#" + (((1 << 24) * Math.random()) | 0).toString(16),
        number: this.userNum,
        message: this.sinMessage,
        time: timestamp.toString(),
        messagecount: 0,
      };
      this.contacts.push(obj);
      this.userNum = "";
      localStorage.setItem("listofconversation", JSON.stringify(this.contacts));
      this.getUnique();
    },
    SendMultiple() {
      const accountSid = this.twilioSsid;
      const authToken = this.twilioAuthToken;
      const client = require("twilio")(accountSid, authToken);
      for (let index = 0; index < this.bulklist.length; index++) {
        client.messages
          .create({
            body: this.mulMessage,
            from: this.myNumber,
            to: this.bulklist[index],
          })
          .then(
            (message) => (this.messageStatus = message.status),
            (this.SendingModal = false)
          );
        var timestamp = new Date();
        var obj = {
          color: "#" + (((1 << 24) * Math.random()) | 0).toString(16),
          number: this.bulklist[index],
          message: this.mulMessage,
          time: timestamp.toString(),
          messagecount: 0,
        };
        this.contacts.push(obj);
      }
      this.sendingAlert = true;
      localStorage.setItem("listofconversation", JSON.stringify(this.contacts));
      this.BulkModal = false;
      this.InboxModal = true;
      this.getUnique();
      this.bulklist = [];
      this.showAddSuccessMessage = "Numbers Reset Successfully";
      this.showAddSuccess = true;
      this.mulContacts = "";
    },
    RetriveLog() {
      this.contactsLog = [];
      const accountSid = this.twilioSsid;
      const authToken = this.twilioAuthToken;
      const client = require("twilio")(accountSid, authToken);
      client.messages
        .list({
          from: this.userNum,
          to: this.myNumber,
          limit: Number(this.limitToshow),
        })
        .then((messages) =>
          messages.map((m) => {
            let color = "";
            if (m.status == "received")
              color = "green";
            else 
              color = "red";

            var obj = {
              color,
              status: m.status,
              number: this.userNum,
              message: m.body,
              time: m.dateSent,
            };
            this.contactsLog.push(obj);
          })
        );
      client.messages
        .list({
          from: this.myNumber,
          to: this.userNum,
          limit: Number(this.limitToshow),
        })
        .then((messages) =>
          messages.map((m) => {
            let color = "";
            if (m.status == "received")
              color = "green";
            else 
              color = "red";

            var obj = {
              color,
              status: m.status,
              number: this.userNum,
              message: m.body,
              time: m.dateSent,
            };
            this.contactsLog.push(obj);
          })
        );
    },
    RetriveLogAll() {
      this.contactsLogAll = [];
      const accountSid = this.twilioSsid;
      const authToken = this.twilioAuthToken;
      const client = require("twilio")(accountSid, authToken);
      client.messages
        .list({
          limit: Number(this.limitToshowAll),
        })
        .then((messages) =>
          messages.map((m) => {
            console.log(m)
            let color = "";
            if (m.status == "received"){
              color = "green";
              var obj = {
                color,
                status: m.status,
                number: m.from,
                message: m.body,
                time: m.dateSent,
              };
              this.contactsLogAll.push(obj);
            }
          })
        );
    },
    personalSend(number) {
      this.userNum = number;
      this.SendingModal = true;
    },
    chat(num) {
      this.selectednum = num;
      this.InsideModal = true;
    },
    addToBulk(mulContacts) {
      if (mulContacts == "clear") {
        this.bulklist = [];
        this.showAddSuccessMessage = "Numbers Reset Successfully";
        this.showAddSuccess = true;
        this.mulContacts = "";
      } else {
        if (this.mulContacts != "") {
          var nums = this.mulContacts.split("\n");
          nums.forEach((element) => {
            this.bulklist.push(element);
            var obj = {
              color: "#" + (((1 << 24) * Math.random()) | 0).toString(16),
              number: element,
              message: this.mulMessage,
            };
            this.bulklistSent.push(obj);
          });
          localStorage.setItem("sent",  JSON.stringify(this.bulklistSent));
          this.mulContacts = "";
          this.showAddSuccessMessage = "Numbers Added Successfully";
          this.showAddSuccess = true;
        }
      }
    },
    onFileChange(e) {
      var file = event.target.files[0];
      var temp = '' 
      var placeholder = '+1'
      let vm = this
      this.$papa.parse(file, {
        header: true,
          complete: function (results) {
          results.data.map(num => (
           num['Phone Number'] ? num['Phone Number'].length > 12 ? num['Phone Number'].split(/\r?\n/).forEach(ele => temp+= placeholder + ele.replace(/[{(-)}]/g, '').replace(/-/g, '').replace(/ /g, '') + ',') : temp+= placeholder + num['Phone Number'].replace(/[{(-)}]/g, '').replace(/-/g, '').replace(/ /g, '') + ',' : ''
          ));
          var nums = temp.slice(0, temp.length-1).split(",");
          nums.forEach((element) => {
            vm.bulklist.push(element);
            var obj = {
              color: "#" + (((1 << 24) * Math.random()) | 0).toString(16),
              number: element,
              message: vm.mulMessage,
            };
            vm.bulklistSent.push(obj);
          });
          localStorage.setItem("sent",  JSON.stringify(vm.bulklistSent));
          vm.mulContacts = temp.slice(0, temp.length-1);
          vm.showAddSuccessMessage = "Numbers Added Successfully";
          vm.showAddSuccess = true;
        }
      });
    },
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
  },
  created() {
    this.$vuetify.theme.light = true;
    this.update();
  },
  mounted() {
    this.update();
    this.getUnique();
  },
};
</script>
<style>
.v-dialog {
  overflow-y: scroll !important;
}

.v-dialog::-webkit-scrollbar {
  display: none !important;
}

.v-dialog {
  -ms-overflow-style: none !important;
  scrollbar-width: none !important;
}
.deco {
  margin: 10px;
}
.upload{
  color: #1E88E5 !important;
  caret-color: #1E88E5 !important;
}
::-webkit-file-upload-button{
  background-color: transparent;
  box-shadow: 0 0 4px 0 rgba(255, 255, 255, 0.1);
  border: 0;
}
.inboxClick{
  cursor: pointer;
}
</style>