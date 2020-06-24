const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://name.glitch.me/`); /// name بگۆره‌ بۆ ناوی پڕۆژه‌كه‌ت
}, 280000);

// پاكێجه‌كان
const Discord = require("discord.js");
const { YT_API_KEY, prefix, devs } = require("./config");
const client = new Discord.Client({
  disableEveryone: true
});
client.login(process.env.TOKEN);
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//كۆدی ڕێكلام

client.on("message", async message => {
  if (!message.guild || message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  if (message.content.startsWith(prefix + "bc")) {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.reply("ڕێگاپێدانی داواكراوت نییه‌ ``ADMINISTRATOR``");
    if (message.guild.interval)
      return message.reply(
        "**ڕێكلام ده‌ستی پێكرد تكایه‌ چاوه‌رێ بكه‌ تا ته‌واو ده‌بێت**"
      );
    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (!args)
      return message.reply("**ده‌بیت نامه‌كه‌ له‌دوای فه‌رمانه‌كه‌ بنوسیت**");

    message.channel
      .send(
        ">>> **[1] ناردن بۆ هه‌موو ئه‌ندامه‌كان\n[2] ناردن بۆ ئه‌و ئه‌ندامانه‌ی له‌ هێڵن\n[3] ناردن بۆ ڕۆڵێكی دیاریكراو\n[0] بۆ هه‌ڵوه‌شاندنه‌وه‌**"
      )
      .then(m => {
        message.channel
          .awaitMessages(msg => msg.author.id === message.author.id, {
            max: 1,
            time: 1000 * 60 * 2,
            errors: ["time"]
          })
          .then(async c => {
            var members = null;
            if (c.first().content === "1") {
              members = message.guild.members.array();
              c.first()
                .delete()
                .catch(err => null);
              m.delete().catch(err => null);
            }
            if (c.first().content === "2") {
              members = message.guild.members
                .filter(m => m.presence.status !== "offline")
                .array();

              c.first()
                .delete()
                .catch(err => null);
              m.delete().catch(err => null);
            }
            if (c.first().content == "0") {
              c.first()
                .delete()
                .catch(err => null);
              m.delete().catch(err => null);
              message.channel.send("**پرۆسه‌كه‌ هه‌ڵوه‌شێنراوه‌**");
            }
            if (c.first().content === "3") {
              m.edit("**>>> ناوی ڕۆڵه‌كه‌ بنوسه‌**").then(ms => {
                message.channel
                  .awaitMessages(msg => msg.author.id === message.author.id, {
                    max: 1,
                    time: 1000 * 60 * 2,
                    errors: ["time"]
                  })
                  .then(async collected => {
                    let role = message.guild.roles.find(
                      role => role.name === collected.first().content
                    );
                    if (!role)
                      return message.channel
                        .send("**:x: ناتوانم ڕۆڵی داواكراو بدۆزمه‌وه‌**")
                        .then(() => {
                          ms.delete().catch(err => null);
                          collected
                            .first()
                            .delete()
                            .catch(err => null);
                        });

                    let roleID = role.id;
                    members = message.guild.roles.get(roleID).members.array();
                    if (members == null)
                      return message.reply("**ژماره‌كه‌ نادروسته‌**");
                    if (members.length == 0)
                      return message.reply("**ژماره‌كه‌ نه‌دۆزراوه‌**");
                    else {
                      const msg = await message.channel.send(
                        `**خه‌ریكه‌ نامه‌كه‌ ده‌نێردرێت بۆ ${members.length} ئه‌ندام...**`
                      );
                      var count = 0;
                      var ycount = 0;
                      var xcount = 0;
                      message.guild.interval = await setInterval(() => {
                        if (!members[count]) {
                          clearInterval(message.guild.inter);
                          msg.edit(
                            new Discord.RichEmbed()
                              .setDescription(
                                `** :mailbox_with_mail:  ؛ توانرا نامه‌كه‌ بنێردرێت بۆ  ${ycount} ئه‌ندام \n:lock: ؛ وه‌ نه‌توانرا بنێردرێت بۆ ${xcount} ئه‌ندام**`
                              )
                              .setTimestamp()
                          );
                          message.guild.interval = false;
                        } else if (!members[count].user.bot) {
                          members[count]
                            .send(`${args}`)
                            .then(() => {
                              ycount++;
                            })
                            .catch(err => {
                              return xcount++;
                            });
                        }
                        count++;
                      }, 500);
                    }
                    collected.first().delete();
                    m.delete();
                  })
                  .catch(err => {
                    return ms.delete().catch(err => null);
                  });
              });
            }
            if (["1", "2"].includes(c.first().content)) {
              if (members == null)
                return message.reply("**ژماره‌كه‌ نادروسته‌**");
              if (members.length == 0)
                return message.reply(
                  "**لم يتم العثور على الرقم.ژماره‌كه‌ نه‌دۆزراوه‌**"
                );
              else {
                const msg = await message.channel.send(
                  `**خه‌ریكه‌ نامه‌كه‌ ده‌نێردرێت بۆ ${members.length} ئه‌ندام...**`
                );
                var count = 0;
                var ycount = 0;
                var xcount = 0;
                message.guild.interval = await setInterval(() => {
                  if (!members[count]) {
                    clearInterval(message.guild.inter);
                    msg.edit(
                      new Discord.RichEmbed()
                        .setDescription(
                          `** :mailbox_with_mail:  ؛ توانرا نامه‌كه‌ بنێردرێت بۆ  ${ycount} ئه‌ندام \n:lock: ؛ وه‌ نه‌توانرا بنێردرێت بۆ ${xcount} ئه‌ندام**`
                        )
                        .setTimestamp()
                    );
                    message.guild.interval = false;
                  } else if (!members[count].user.bot) {
                    members[count]
                      .send(`${args}`)
                      .then(() => {
                        ycount++;
                      })
                      .catch(err => {
                        return xcount++;
                      });
                  }
                  count++;
                }, 500);
              }
            }
          })
          .catch(err => {
            return m.delete().catch(err => null);
          });
      });
  } else if (message.content.startsWith(prefix + "setname")) {
    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (!message.author.id === "696338291229982820") return; ///تعديل مهم حط الايدي تبعك
    client.user.setUsername(args);
    message.channel.send(`ناوی بۆته‌كه‌ گۆردرا بۆ ..**${args}** `);
  } else if (message.content.startsWith(prefix + "setavatar")) {
    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (!message.author.id === "696338291229982820") return; /// تعديل مهم حط الايدي تبعك
    client.user.setAvatar(args).catch(err => message.reply("send a valid url"));
    message.channel.send(`وێنه‌ی بۆته‌كه‌ گۆردرا بۆ :**${args}** `);
  }
});

///گۆرینی بار

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.on("ready", () => {
  client.user.setStatus("dnd"); ///گۆرینی باری بۆته‌كه‌
});
client.on("ready", () => {
  client.user.setActivity(`${prefix}bc`, {
    ///گۆرینی نوسینی باری بۆته‌كه‌
    type: "WATCHING"
  });
});

//online
//idle
//dnd
//offline
