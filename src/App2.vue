<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item link>
          <v-btn
            color="blue white--text"
            @click="ContactsModal = !ContactsModal"
            block
          >
            ADD CONTACT
          </v-btn>
          <v-dialog v-model="ContactsModal" persistent max-width="600px">
            <v-card>
              <v-card-title>
                <span class="headline">New Contact</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="newNumber"
                        label="Add New Contact *"
                        counter="60"
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
                  @click="ContactsModal = !ContactsModal"
                  >Close</v-btn
                >
                <v-btn color="blue darken-1" text @click="AddContact()"
                  >Save</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-list-item>
        <slot v-if="profiles.length <= 0">
          <v-skeleton-loader type="list-item-avatar"></v-skeleton-loader>
          <v-skeleton-loader type="list-item-avatar"></v-skeleton-loader>
          <v-skeleton-loader type="list-item-avatar"></v-skeleton-loader>
        </slot>
        <slot v-else v-for="(item, i) in profiles">
          <v-list-item
            :key="i"
            link
            :class="`${userNumber === item.number ? 'selectedNum' : ''}`"
          >
            <v-list-item-action>
              <v-avatar size="32" color="indigo">
                <v-icon dark> mdi-account </v-icon>
              </v-avatar>
            </v-list-item-action>
            <v-list-item-title @click="getAllMessages(item.number)">
              {{ item.number }}
            </v-list-item-title>
            <v-btn
              elevation="2"
              fab
              x-small
              color="red"
              @click="removeProfile(item.id)"
            >
              <v-icon class="white--text"> mdi-delete </v-icon>
            </v-btn>
          </v-list-item>
        </slot>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="green" dense>
      <v-app-bar-nav-icon
        class="white--text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="mr-12 align-center white--text">
        <span class="title">Twilio SMS Portal</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="mr-2" color="red" fab x-small>
        <v-icon class="white--text" @click="BulkModal = !BulkModal">
          mdi-youtube-subscription
        </v-icon>
      </v-btn>
      <v-btn
        class="mr-2"
        color="red"
        fab
        x-small
        @click="SettingsModal = !SettingsModal"
      >
        <v-icon class="white--text"> mdi-cog </v-icon>
      </v-btn>
      <v-btn color="red" fab x-small @click="DialPadModal = !DialPadModal">
        <v-icon class="white--text"> mdi-dialpad </v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <!-- Main Screen -->
        <slot>
          <v-dialog v-model="DialPadModal" max-width="300px">
            <v-card>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="dialNumber"
                            counter
                            clearable
                            prefix="+1"
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col cols="4">
                          <v-btn block large @click="dialNumber += '1'">
                            1
                          </v-btn>
                        </v-col>
                        <v-col cols="4">
                          <v-btn block large @click="dialNumber += '2'">
                            2
                          </v-btn>
                        </v-col>
                        <v-col cols="4">
                          <v-btn block large @click="dialNumber += '3'">
                            3
                          </v-btn>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col cols="4">
                          <v-btn block large @click="dialNumber += '4'">
                            4
                          </v-btn>
                        </v-col>
                        <v-col cols="4">
                          <v-btn block large @click="dialNumber += '5'">
                            5
                          </v-btn>
                        </v-col>
                        <v-col cols="4">
                          <v-btn block large @click="dialNumber += '6'">
                            6
                          </v-btn>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col cols="4">
                          <v-btn block large @click="dialNumber += '7'">
                            7
                          </v-btn>
                        </v-col>
                        <v-col cols="4">
                          <v-btn block large @click="dialNumber += '8'">
                            8
                          </v-btn>
                        </v-col>
                        <v-col cols="4">
                          <v-btn block large @click="dialNumber += '9'">
                            9
                          </v-btn>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col cols="4">
                          <v-btn block large @click="dialNumber += '*'">
                            *
                          </v-btn>
                        </v-col>
                        <v-col cols="4">
                          <v-btn block large @click="dialNumber += '0'">
                            0
                          </v-btn>
                        </v-col>
                        <v-col cols="4">
                          <v-btn block large @click="dialNumber += '#'">
                            #
                          </v-btn>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col class="initialConv" cols="12">
                          <v-btn fab color="green" large>
                            <v-icon>mdi-phone</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
        </slot>
        <slot v-if="conversationModal">
          <slot>
            <v-row>
              <v-col
                id="message-history"
                class="conversation-history"
                cols="12"
              >
                <hr />
                <v-timeline
                  align-top
                  :dense="$vuetify.breakpoint.smAndDown"
                  v-model="conversationModal"
                >
                  <v-timeline-item
                    v-for="(message, i) in allMessages"
                    :key="i"
                    :color="`${
                      message.status === 'received' ? 'green' : 'red'
                    }`"
                    :icon="`${
                      message.status === 'received'
                        ? 'mdi-message'
                        : 'mdi-message-reply'
                    }`"
                    fill-dot
                  >
                    <span slot="opposite"
                      ><p>
                        <b>{{ message.number }}</b>
                      </p>
                      <small>{{ message.time }}</small>
                    </span>
                    <v-card
                      :color="`${
                        message.status === 'received' ? 'green' : 'red'
                      }`"
                      dark
                    >
                      <v-card-title class="title">
                        {{ message.status.toUpperCase() }}
                        <v-spacer></v-spacer>
                        <v-btn
                          fab
                          x-small
                          color="purple"
                          @click="
                            SendingSpecificModal = !SendingSpecificModal;
                            specNumber = message.number;
                            getAllMessagesSpec(message.number);
                          "
                        >
                          <v-icon>mdi-eye</v-icon>
                        </v-btn>
                      </v-card-title>
                      <v-card-text class="white text--primary">
                        {{ message.body }}
                      </v-card-text>
                    </v-card>
                  </v-timeline-item>
                </v-timeline>
                <v-row v-if="refresh">
                  <v-col class="initialConv" cols="12">
                    <v-progress-circular
                      :width="3"
                      color="red"
                      indeterminate
                    ></v-progress-circular>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-row class="conversation-messages-send">
                <v-col cols="12">
                  <v-text-field
                    v-model="textbody"
                    :append-outer-icon="textbody ? 'mdi-send' : 'mdi-reload'"
                    clear-icon="mdi-close-circle"
                    prepend-icon="mdi-download"
                    clearable
                    label="Type Message...."
                    outlined
                    dense
                    @click:append-outer="
                      textbody ? SendSingle() : getAllMessages(userNumber)
                    "
                    @click:prepend="getIncomingMessages()"
                    @click:clear="textbody = ''"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-row>
          </slot>
        </slot>
        <slot v-else>
          <v-row>
            <v-col class="conversation initialConv" cols="12">
              <h1>Select Any Conversation.....</h1>
            </v-col>
          </v-row>
        </slot>
        <!-- specific sending -->
        <v-dialog v-model="SendingModal" persistent>
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
                      v-model="specNumber"
                      label="User Number *"
                      maxlength="34"
                      counter="34"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="specMessage"
                      name="input-7-1"
                      label="Message *"
                      value=""
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
              <v-btn color="blue darken-1" text @click="SendSingleSpec()"
                >Send</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- specific log -->
        <v-dialog v-model="SendingSpecificModal" persistent>
          <v-card>
            <v-card-title>
              <span class="headline">View Log</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    id="message-history"
                    class="conversation-history2"
                    cols="12"
                  >
                    <hr />
                    <v-timeline
                      align-top
                      :dense="$vuetify.breakpoint.smAndDown"
                    >
                      <v-timeline-item
                        v-for="(message, i) in allMessagesSpec"
                        :key="i"
                        :color="`${
                          message.status === 'received' ? 'green' : 'red'
                        }`"
                        :icon="`${
                          message.status === 'received'
                            ? 'mdi-message'
                            : 'mdi-message-reply'
                        }`"
                        fill-dot
                      >
                        <span slot="opposite"
                          ><p>
                            <b>{{ message.number }}</b>
                          </p>
                          <small>{{ message.time }}</small>
                        </span>
                        <v-card
                          :color="`${
                            message.status === 'received' ? 'green' : 'red'
                          }`"
                          dark
                        >
                          <v-card-title class="title">
                            {{ message.status.toUpperCase() }}
                            <v-spacer></v-spacer>
                            <v-btn
                              fab
                              x-small
                              color="green"
                              @click="
                                SendingModal = !SendingModal;
                                specNumber = message.number;
                              "
                            >
                              <v-icon>mdi-send</v-icon>
                            </v-btn>
                          </v-card-title>
                          <v-card-text class="white text--primary">
                            {{ message.body }}
                          </v-card-text>
                        </v-card>
                      </v-timeline-item>
                    </v-timeline>
                    <v-row v-if="refresh">
                      <v-col class="initialConv" cols="12">
                        <v-progress-circular
                          :width="3"
                          color="red"
                          indeterminate
                        ></v-progress-circular>
                      </v-col>
                    </v-row>
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
                @click="SendingSpecificModal = !SendingSpecificModal"
                >Close</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- bulk sms -->
        <v-row justify="center">
          <v-dialog
            v-model="BulkModal"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <v-card>
              <v-toolbar dark color="primary">
                <v-btn icon dark @click="BulkModal = !BulkModal">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title> Bulk SMS Sending </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn dark text @click="SendMultiple()"> Send </v-btn>
                </v-toolbar-items>
              </v-toolbar>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-textarea
                        v-model="mulContacts"
                        name="input-4-1"
                        label="Enter Number by entering a newline *"
                        value=""
                        counter
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12">
                      <v-btn
                        color="blue darken-1 white--text"
                        block
                        @click="addToBulk(mulContacts)"
                        >Add To Bulk</v-btn
                      >
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        v-model="mulMessage"
                        name="input-7-1"
                        label="Message *"
                        value=""
                        :hint="'Send the message to ' + bulklist"
                      ></v-textarea>
                    </v-col>
                    <v-col col="12">
                      <v-row>
                        <v-col cols="8">
                          <h3>Message To be Sent</h3>
                        </v-col>
                        <v-col cols="2">
                          <v-btn
                            block
                            color="green"
                            @click="bulklist.map((item) => addToProfile(item))"
                            >Save All</v-btn
                          >
                        </v-col>
                        <v-col cols="2">
                          <v-btn block color="green" @click="bulklist = []"
                            >Clear All</v-btn
                          >
                        </v-col>
                      </v-row>
                      <v-simple-table dense>
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-left">No.</th>
                              <th class="text-center">Number</th>
                              <th class="text-center">Add</th>
                              <th class="text-center">Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, i) in bulklist" :key="i">
                              <td>{{ i }}</td>
                              <td class="text-center pt-5">
                                <v-text-field
                                  value=""
                                  dense
                                  v-model="bulklist[i]"
                                  label="Outlined"
                                  outlined
                                  @keypress="check(bulklist[i], i)"
                                  @blur="
                                    item === '' ? bulklist.splice(i, 1) : ''
                                  "
                                ></v-text-field>
                              </td>
                              <td class="text-center">
                                <v-btn
                                  color="green darken-1 white--text"
                                  fab
                                  x-small
                                  :disabled="checkEligibility(item)"
                                  @click="addToProfile(item)"
                                >
                                  <v-icon>mdi-plus</v-icon>
                                </v-btn>
                              </td>
                              <td class="text-center">
                                <v-btn
                                  color="red darken-1 white--text"
                                  fab
                                  x-small
                                  @click="bulklist.splice(i, 1)"
                                >
                                  <v-icon>mdi-delete</v-icon>
                                </v-btn>
                              </td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-col>
                  </v-row>
                </v-container>
                <small
                  >*indicates required field ( always include the country code
                  in number like '+1' before any number )</small
                >
              </v-card-text>
              <v-card-actions>
                <form enctype="multipart/form-data">
                  <input
                    class="ma-2 black--text"
                    text
                    type="file"
                    ref="fileInput"
                    @change="onFileChange"
                  />
                </form>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
        <!-- setting -->
        <v-row>
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
                <v-btn color="blue darken-1" text @click="setCredentials()"
                  >Save</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from "firebase";
import { writeUserData, deleteUserData } from "./data/data";
export default {
  data() {
    return {
      messages: [],
      messagesSpec: [],
      messages2: [],
      profiles: [],
      mulMessage: "",
      mulContacts: "",
      textbody: "",
      twilioAuthToken: "",
      twilioSsid: "",
      myNumber: "",
      userNumber: "",
      userNumber: "",
      newNumber: "",
      dialNumber: "",
      show1: false,
      drawer: true,
      BulkModal: false,
      SettingsModal: false,
      conversationModal: false,
      ContactsModal: false,
      DialPadModal: false,
      SendingModal: false,
      SendingSpecificModal: false,
      refresher: false,
      refresh: false,
      bulklist: [],
      specNumber: "",
      specMessage: "",
    };
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
  },
  computed: {
    allMessages: function () {
      return this.messages
        .sort((a, b) => {
          return new Date(b.time) - new Date(a.time);
        })
        .reverse();
    },
    allMessagesSpec: function () {
      return this.messagesSpec.sort((a, b) => {
        return new Date(b.time) - new Date(a.time);
      });
    },
  },
  methods: {
    setCredentials() {
      localStorage.setItem("twilioSSID", this.twilioSsid);
      localStorage.setItem("twilioAuthToken", this.twilioAuthToken);
      localStorage.setItem("myNumber", this.myNumber);
      this.SettingsModal = false;
    },
    updateCredentials() {
      this.twilioSsid = localStorage.twilioSSID;
      this.twilioAuthToken = localStorage.twilioAuthToken;
      this.myNumber = localStorage.myNumber;
    },
    getAllMessages(userNumber) {
      this.userNumber = userNumber;
      this.messages = [];
      const accountSid = this.twilioSsid;
      const authToken = this.twilioAuthToken;
      const client = require("twilio")(accountSid, authToken);
      client.messages
        .list({
          to: userNumber,
          from: this.myNumber,
          limit: Number(9999999999),
        })
        .then((message) =>
          message.map((m) => {
            let obj = {
              status: m.status,
              body: m.body,
              time: m.dateUpdated,
              number: m.to,
            };
            this.messages.push(obj);
          })
        )
        .then(
          client.messages
            .list({
              to: this.myNumber,
              from: userNumber,
              limit: Number(9999999999),
            })
            .then((message) =>
              message.map((m) => {
                let obj = {
                  status: m.status,
                  body: m.body,
                  time: m.dateUpdated,
                  number: m.from,
                };
                this.messages.push(obj);
              })
            )
        );
      this.gettingMessages();
    },
    gettingMessages() {
      this.conversationModal = true;
      setTimeout(() => {
        this.setPosition();
      }, 3000);
    },
    getAllMessagesSpec(userNumber) {
      this.messagesSpec = [];
      const accountSid = this.twilioSsid;
      const authToken = this.twilioAuthToken;
      const client = require("twilio")(accountSid, authToken);
      client.messages
        .list({
          to: userNumber,
          from: this.myNumber,
          limit: Number(9999999999),
        })
        .then((message) =>
          message.map((m) => {
            let obj = {
              status: m.status,
              body: m.body,
              time: m.dateUpdated,
              number: m.to,
            };
            this.messagesSpec.push(obj);
          })
        )
        .then(
          client.messages
            .list({
              to: this.myNumber,
              from: userNumber,
              limit: Number(9999999999),
            })
            .then((message) =>
              message.map((m) => {
                let obj = {
                  status: m.status,
                  body: m.body,
                  time: m.dateUpdated,
                  number: m.from,
                };
                this.messagesSpec.push(obj);
              })
            )
        );
      setTimeout(() => {
        this.setPosition();
      }, 3000);
    },
    SendSingle() {
      const accountSid = this.twilioSsid;
      const authToken = this.twilioAuthToken;
      const client = require("twilio")(accountSid, authToken);
      let vm = this;
      client.messages
        .create({
          body: this.textbody,
          from: this.myNumber,
          to: this.userNumber,
        })
        .then((message) =>
          setTimeout(() => {
            this.getAllMessages(vm.userNumber);
          }, 6000)
        );
      this.getAllMessages(vm.userNumber);
    },
    SendSingleSpec() {
      const accountSid = this.twilioSsid;
      const authToken = this.twilioAuthToken;
      const client = require("twilio")(accountSid, authToken);
      let vm = this;
      client.messages
        .create({
          body: this.specMessage,
          from: this.myNumber,
          to: this.specNumber,
        })
        .then((message) =>
          setTimeout(() => {
            this.getAllMessages(vm.userNumber);
          }, 6000)
        );
      this.getAllMessages(vm.userNumber);
      this.SendingModal = false;
    },
    SendMultiple() {
      const accountSid = this.twilioSsid;
      const authToken = this.twilioAuthToken;
      const client = require("twilio")(accountSid, authToken);
      let vm = this;
      this.bulklist.forEach(function (number) {
        var message = client.messages
          .create({
            body: vm.mulMessage,
            from: vm.myNumber,
            to: number,
          })
          .then((message) => console.log(message.status));
      });

      //this.BulkModal = false;
      //this.bulklist = [];
      this.mulContacts = "";
    },
    AddContact() {
      let obj = {
        id: Math.round(Math.random() * 100) + Math.round(Math.random() * 100),
        number: this.newNumber,
      };
      writeUserData(obj.id, obj.number);
      this.profiles = [];
      this.fetchData();
      this.ContactsModal = false;
    },
    addToBulk(mulContacts) {
      if (this.mulContacts != "") {
        var nums = this.mulContacts.split("\n");
        nums.forEach((element) => {
          if (element !== "") this.bulklist.push(element);
        });
        this.mulContacts = "";
      }
    },
    onFileChange(e) {
      var file = e.target.files[0];
      var temp = "";
      var placeholder = "+1";
      let vm = this;
      this.$papa.parse(file, {
        header: true,
        complete: function (results) {
          results.data.map((num) =>
            num["Phone Number"]
              ? num["Phone Number"].length > 12
                ? num["Phone Number"].split(/\r?\n/).forEach(
                    (ele) =>
                      (temp +=
                        placeholder +
                        ele
                          .replace(/[{(-)}]/g, "")
                          .replace(/-/g, "")
                          .replace(/ /g, "") +
                        ",")
                  )
                : (temp +=
                    placeholder +
                    num["Phone Number"]
                      .replace(/[{(-)}]/g, "")
                      .replace(/-/g, "")
                      .replace(/ /g, "") +
                    ",")
              : ""
          );
          var nums = temp.slice(0, temp.length - 1).split(",");
          nums.forEach((element) => {
            vm.bulklist.push(element);
          });
        },
      });
      this.reset();
    },
    reset() {
      const input = this.$refs.fileInput;
      input.type = "text";
      input.type = "file";
    },
    check(item, index) {
      this.bulklist[index] = item;
    },
    checkEligibility(item) {
      var check = false;
      this.profiles.map((profile) =>
        profile.number === item ? (check = true) : ""
      );
      return check;
    },
    addToProfile(item) {
      let obj = {
        id: Math.round(Math.random() * 100) + Math.round(Math.random() * 100),
        number: item,
      };
      writeUserData(obj.id, obj.number);
      this.profiles = [];
      this.fetchData();
    },
    fetchData() {
      var database = firebase.database();
      var starCountRef = database.ref("data");
      let vm = this;
      starCountRef.on("value", function (snapshot) {
        Object.entries(snapshot.val())
          .map((val) => {
            return val[1];
          })
          .map((val) => vm.profiles.push(val));
      });
    },
    removeProfile(id) {
      deleteUserData(id);
      this.profiles = [];
      this.fetchData();
    },
    getMessagesLength() {
      this.messages2 = [];
      const accountSid = this.twilioSsid;
      const authToken = this.twilioAuthToken;
      const client = require("twilio")(accountSid, authToken);
      client.messages
        .list({
          to: this.userNumber,
          from: this.myNumber,
          limit: Number(9999999999),
        })
        .then((message) =>
          message.map((m) => {
            let obj = {
              status: m.status,
              body: m.body,
              time: m.dateUpdated,
              number: m.to,
            };
            this.messages2.push(obj);
          })
        )
        .then(
          client.messages
            .list({
              to: this.myNumber,
              from: this.userNumber,
              limit: Number(9999999999),
              number: m.from,
            })
            .then((message) =>
              message.map((m) => {
                let obj = {
                  status: m.status,
                  body: m.body,
                  time: m.dateUpdated,
                };
                this.messages2.push(obj);
              })
            )
        );
    },
    setPosition() {
      var objDiv = document.getElementById("message-history");
      var objDiv = document.getElementById("message-history");
      objDiv.scrollTop = objDiv.scrollHeight;
    },
    Refresher() {
      let vm = this;
      setTimeout(() => vm.getMessagesLength(), 2000);
    },
    AutoRefresher() {
      let vm = this;
      setTimeout(() => {
        if (!this.refresher) {
          this.refresh = true;
          this.Refresher();
          this.setPosition();
          if (this.messages2.length > this.messages.length) {
            this.messages = [...this.messages2];
            this.RemoveAutoRefresher();
            this.setPosition();
          }
          this.AutoRefresher();
        } else {
          clearInterval();
          this.refresher = false;
          this.refresh = false;
        }
      }, 5000);
    },
    RemoveAutoRefresher() {
      this.refresher = true;
      this.messages2 = [];
      this.refresh = false;
    },
    getIncomingMessages() {
      this.messages = [];
      const accountSid = this.twilioSsid;
      const authToken = this.twilioAuthToken;
      const client = require("twilio")(accountSid, authToken);
      client.messages
        .list({
          to: this.myNumber,
          limit: Number(9999999999),
        })
        .then((message) =>
          message.map((m) => {
            console.log(m);
            let obj = {
              status: m.status,
              body: m.body,
              time: m.dateUpdated,
              number: m.from,
            };
            this.messages.push(obj);
          })
        )
        .then(
          client.messages
            .list({
              from: this.myNumber,
              limit: Number(9999999999),
            })
            .then((message) =>
              message.map((m) => {
                let obj = {
                  status: m.status,
                  body: m.body,
                  time: m.dateUpdated,
                  number: m.to,
                };
                this.messages.push(obj);
              })
            )
        );
      this.setPosition();
    },
  },
  mounted() {
    this.updateCredentials();
    this.fetchData();
  },
};
</script>
<style>
body {
  overflow: hidden;
}
.inbox-item {
  cursor: pointer;
}
.inbox-item:hover {
  box-shadow: 0px 3px 6px -2px rgba(0, 0, 0, 0.2),
    0px 2px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12) !important;
  transition: all 0.2s ease-in-out;
}
.conversation {
  height: 88vh;
  width: 90%;
  margin: 0 auto;
}
.initialConv {
  display: flex;
  justify-content: center;
  align-items: center;
}
.conversation-history {
  height: calc(90vh - 88px);
  overflow-y: scroll;
}
.conversation-history2 {
  height: calc(60vh - 88px);
  overflow-y: scroll;
}
.conversation-messages-send {
  margin: 0;
  padding: 0 10vw;
  height: 52px;
  overflow: hidden;
}
.conversation-messages-send-tab {
  display: flex;
  justify-content: center;
}
.selectedNum {
  background-color: lightgrey;
}
</style>