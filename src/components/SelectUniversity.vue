<template>
<v-layout>
  <v-btn
    block
    large
    @click.stop="dialog = true"
    style="margin-top: 10px; margin-bottom: 30px;"
  >
    大学/キャンパス名を選択
  </v-btn>
  <v-dialog
    v-model="dialog"
  >
    <v-card>
      <v-card-title class="title">大学名の頭文字を選択する</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-btn-toggle class="my-2 mr-2">
          <v-btn 
            text
            @click="dialog1=true, dialog=false"
          >
            あ
          </v-btn>
          <v-btn 
            text
            @click="dialog2=true, dialog=false"
          >
            い
          </v-btn>
          <v-btn 
            text 
            @click="dialog3=true, dialog=false">
            う
          </v-btn>
          <v-btn 
            text 
            @click="dialog4=true, dialog=false">
            え
          </v-btn>
          <v-btn 
            text 
            @click="dialog5=true, dialog=false">
            お
          </v-btn>
        </v-btn-toggle>
        <v-btn-toggle class="my-2 mr-2">
          <v-btn 
            text
            @click="dialog6=true, dialog=false"
          >
            か
          </v-btn>
          <v-btn 
            text
            @click="dialog7=true, dialog=false"
          >
            き
          </v-btn>
          <v-btn 
            text 
            @click="dialog8=true, dialog=false">
            く
          </v-btn>
          <v-btn 
            text 
            @click="dialog9=true, dialog=false">
            け
          </v-btn>
          <v-btn 
            text 
            @click="dialog10=true, dialog=false">
            こ
          </v-btn>
        </v-btn-toggle>
        <v-btn-toggle class="my-2 mr-2">
          <v-btn 
            text
            @click="dialog11=true, dialog=false"
          >
            さ
          </v-btn>
          <v-btn 
            text
            @click="dialog12=true, dialog=false"
          >
            し
          </v-btn>
          <v-btn 
            text 
            @click="dialog13=true, dialog=false">
            す
          </v-btn>
          <v-btn 
            text 
            @click="dialog14=true, dialog=false">
            せ
          </v-btn>
          <v-btn 
            text 
            @click="dialog15=true, dialog=false">
            そ
          </v-btn>
        </v-btn-toggle>
        <v-btn-toggle class="my-2 mr-2">
          <v-btn 
            text
            @click="dialog16=true, dialog=false"
          >
            た
          </v-btn>
          <v-btn 
            text
            @click="dialog17=true, dialog=false"
          >
            ち
          </v-btn>
          <v-btn 
            text 
            @click="dialog18=true, dialog=false">
            つ
          </v-btn>
          <v-btn 
            text 
            @click="dialog19=true, dialog=false">
            て
          </v-btn>
          <v-btn 
            text 
            @click="dialog20=true, dialog=false">
            と
          </v-btn>
        </v-btn-toggle>
        <v-btn-toggle class="my-2 mr-2">
          <v-btn 
            text
            @click="dialog21=true, dialog=false"
          >
            な
          </v-btn>
          <v-btn 
            text
            @click="dialog22=true, dialog=false"
          >
            に
          </v-btn>
          <v-btn 
            text 
            @click="dialog23=true, dialog=false">
            ぬ
          </v-btn>
          <v-btn 
            text 
            @click="dialog24=true, dialog=false">
            ね
          </v-btn>
          <v-btn 
            text 
            @click="dialog25=true, dialog=false">
            の
          </v-btn>
        </v-btn-toggle>
        <v-btn-toggle class="my-2 mr-2">
          <v-btn 
            text
            @click="dialog26=true, dialog=false"
          >
            は
          </v-btn>
          <v-btn 
            text
            @click="dialog27=true, dialog=false"
          >
            ひ
          </v-btn>
          <v-btn 
            text 
            @click="dialog28=true, dialog=false">
            ふ
          </v-btn>
          <v-btn 
            text 
            @click="dialog29=true, dialog=false">
            へ
          </v-btn>
          <v-btn 
            text 
            @click="dialog30=true, dialog=false">
            ほ
          </v-btn>
        </v-btn-toggle>
        <v-btn-toggle class="my-2 mr-2">
          <v-btn 
            text
            @click="dialog31=true, dialog=false"
          >
            ま
          </v-btn>
          <v-btn 
            text
            @click="dialog32=true, dialog=false"
          >
            み
          </v-btn>
          <v-btn 
            text 
            @click="dialog33=true, dialog=false">
            む
          </v-btn>
          <v-btn 
            text 
            @click="dialog34=true, dialog=false">
            め
          </v-btn>
          <v-btn 
            text 
            @click="dialog35=true, dialog=false">
            も
          </v-btn>
        </v-btn-toggle>
        <v-btn-toggle class="my-2 mr-2">
          <v-btn 
            text
            @click="dialog36=true, dialog=false"
          >
            や
          </v-btn>
          <v-btn 
            text
            @click="dialog38=true, dialog=false"
          >
            ゆ
          </v-btn>
          <v-btn 
            text 
            @click="dialog40=true, dialog=false">
            よ
          </v-btn>
        </v-btn-toggle>
        <v-btn-toggle class="my-2 mr-2">
          <v-btn 
            text
            @click="dialog41=true, dialog=false"
          >
            ら
          </v-btn>
          <v-btn 
            text
            @click="dialog42=true, dialog=false"
          >
            り
          </v-btn>
          <v-btn 
            text 
            @click="dialog43=true, dialog=false">
            る
          </v-btn>
          <v-btn 
            text 
            @click="dialog44=true, dialog=false">
            れ
          </v-btn>
          <v-btn 
            text 
            @click="dialog45=true, dialog=false">
            ろ
          </v-btn>
        </v-btn-toggle>
        <v-btn-toggle class="my-2 mr-2">
          <v-btn 
            text
            @click="dialog46=true, dialog=false"
          >
            わ
          </v-btn>
          <v-btn 
            text
            @click="dialog48=true, dialog=false"
          >
            を
          </v-btn>
          <v-btn 
            text 
            @click="dialog50=true, dialog=false">
            ん
          </v-btn>
        </v-btn-toggle>
      </v-card-text>
    </v-card>
  </v-dialog>
  <v-dialog
    v-model="dialog1"
  >
    <v-card>
      <v-card-title class="title">
        「あ」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities1">
            <v-list-item @click="dialog1=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-dialog
    v-model="dialog2"
  >
    <v-card>
      <v-card-title class="title">
        「い」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities2">
            <v-list-item @click="dialog2=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog3"
  >
    <v-card>
      <v-card-title class="title">
        「う」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities3">
            <v-list-item @click="dialog3=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog4"
  >
    <v-card>
      <v-card-title class="title">
        「え」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities4">
            <v-list-item @click="dialog4=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog5"
  >
    <v-card>
      <v-card-title class="title">
        「お」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities5">
            <v-list-item @click="dialog5=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog6"
  >
    <v-card>
      <v-card-title class="title">
        「か」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities6">
            <v-list-item @click="dialog6=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog7"
  >
    <v-card>
      <v-card-title class="title">
        「き」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities7">
            <v-list-item @click="dialog7=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog8"
  >
    <v-card>
      <v-card-title class="title">
        「く」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities8">
            <v-list-item @click="dialog8=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog9"
  >
    <v-card>
      <v-card-title class="title">
        「け」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities9">
            <v-list-item @click="dialog9=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog10"
  >
    <v-card>
      <v-card-title class="title">
        「こ」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities10">
            <v-list-item @click="dialog10=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog11"
  >
    <v-card>
      <v-card-title class="title">
        「さ」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities11">
            <v-list-item @click="dialog11=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog12"
  >
    <v-card>
      <v-card-title class="title">
        「し」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities12">
            <v-list-item @click="dialog12=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog13"
  >
    <v-card>
      <v-card-title class="title">
        「す」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities13">
            <v-list-item @click="dialog13=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog14"
  >
    <v-card>
      <v-card-title class="title">
        「せ」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities14">
            <v-list-item @click="dialog14=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog15"
  >
    <v-card>
      <v-card-title class="title">
        「そ」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities15">
            <v-list-item @click="dialog15=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog16"
  >
    <v-card>
      <v-card-title class="title">
        「た」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities16">
            <v-list-item @click="dialog16=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog17"
  >
    <v-card>
      <v-card-title class="title">
        「ち」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities17">
            <v-list-item @click="dialog17=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog18"
  >
    <v-card>
      <v-card-title class="title">
        「つ」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities18">
            <v-list-item @click="dialog18=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog19"
  >
    <v-card>
      <v-card-title class="title">
        「て」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities19">
            <v-list-item @click="dialog19=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog20"
  >
    <v-card>
      <v-card-title class="title">
        「と」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities20">
            <v-list-item @click="dialog20=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog21"
  >
    <v-card>
      <v-card-title class="title">
        「な」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities21">
            <v-list-item @click="dialog21=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog22"
  >
    <v-card>
      <v-card-title class="title">
        「に」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities22">
            <v-list-item @click="dialog22=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog23"
  >
    <v-card>
      <v-card-title class="title">
        「ぬ」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities23">
            <v-list-item @click="dialog23=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog24"
  >
    <v-card>
      <v-card-title class="title">
        「ね」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities24">
            <v-list-item @click="dialog24=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog25"
  >
    <v-card>
      <v-card-title class="title">
        「の」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities25">
            <v-list-item @click="dialog25=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog26"
  >
    <v-card>
      <v-card-title class="title">
        「は」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities26">
            <v-list-item @click="dialog26=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog27"
  >
    <v-card>
      <v-card-title class="title">
        「ひ」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities27">
            <v-list-item @click="dialog27=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog28"
  >
    <v-card>
      <v-card-title class="title">
        「ふ」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities28">
            <v-list-item @click="dialog28=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog29"
  >
    <v-card>
      <v-card-title class="title">
        「へ」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities29">
            <v-list-item @click="dialog29=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog30"
  >
    <v-card>
      <v-card-title class="title">
        「ほ」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities30">
            <v-list-item @click="dialog30=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog31"
  >
    <v-card>
      <v-card-title class="title">
        「ま」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities31">
            <v-list-item @click="dialog31=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog32"
  >
    <v-card>
      <v-card-title class="title">
        「み」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities32">
            <v-list-item @click="dialog32=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog33"
  >
    <v-card>
      <v-card-title class="title">
        「む」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities33">
            <v-list-item @click="dialog33=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog34"
  >
    <v-card>
      <v-card-title class="title">
        「め」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities34">
            <v-list-item @click="dialog34=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog35"
  >
    <v-card>
      <v-card-title class="title">
        「も」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities35">
            <v-list-item @click="dialog35=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog36"
  >
    <v-card>
      <v-card-title class="title">
        「や」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities36">
            <v-list-item @click="dialog36=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  
  <v-dialog
    v-model="dialog38"
  >
    <v-card>
      <v-card-title class="title">
        「ゆ」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities38">
            <v-list-item @click="dialog38=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog40"
  >
    <v-card>
      <v-card-title class="title">
        「よ」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities40">
            <v-list-item @click="dialog40=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog41"
  >
    <v-card>
      <v-card-title class="title">
        「ら」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities41">
            <v-list-item @click="dialog41=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog42"
  >
    <v-card>
      <v-card-title class="title">
        「り」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities42">
            <v-list-item @click="dialog42=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog43"
  >
    <v-card>
      <v-card-title class="title">
        「る」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities43">
            <v-list-item @click="dialog43=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog44"
  >
    <v-card>
      <v-card-title class="title">
        「れ」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities44">
            <v-list-item @click="dialog44=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog45"
  >
    <v-card>
      <v-card-title class="title">
        「ろ」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities45">
            <v-list-item @click="dialog45=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog46"
  >
    <v-card>
      <v-card-title class="title">
        「わ」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities46">
            <v-list-item @click="dialog46=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog48"
  >
    <v-card>
      <v-card-title class="title">
        「を」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities48">
            <v-list-item @click="dialog48=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  <v-dialog
    v-model="dialog50"
  >
    <v-card>
      <v-card-title class="title">
        「ん」で始まる大学/キャンパス一覧
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="item in universities50">
            <v-list-item @click="dialog50=false; select(item.name);">{{ item.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  
</v-layout>
</template>

<script>
import universities from '../assets/files/universities.json'
export default {
  data: () => ({
    dialog: false,
    dialog1: false,
    dialog2: false,
    dialog3: false,
    dialog4: false,
    dialog5: false,
    dialog6: false,
    dialog7: false,
    dialog8: false,
    dialog9: false,
    dialog10: false,
    dialog11: false,
    dialog12: false,
    dialog13: false,
    dialog14: false,
    dialog15: false,
    dialog16: false,
    dialog17: false,
    dialog18: false,
    dialog19: false,
    dialog20: false,
    dialog21: false,
    dialog22: false,
    dialog23: false,
    dialog24: false,
    dialog25: false,
    dialog26: false,
    dialog27: false,
    dialog28: false,
    dialog29: false,
    dialog30: false,
    dialog31: false,
    dialog32: false,
    dialog33: false,
    dialog34: false,
    dialog35: false,
    dialog36: false,
    dialog37: false,
    dialog38: false,
    dialog39: false,
    dialog40: false,
    dialog41: false,
    dialog42: false,
    dialog43: false,
    dialog44: false,
    dialog45: false,
    dialog46: false,
    dialog47: false,
    dialog48: false,
    dialog49: false,
    dialog50: false,
    universities1: universities.data1,
    universities2: universities.data2,
    universities3: universities.data3,
    universities4: universities.data4,
    universities5: universities.data5,
    universities6: universities.data6,
    universities7: universities.data7,
    universities8: universities.data8,
    universities9: universities.data9,
    universities10: universities.data10,
    universities11: universities.data11,
    universities12: universities.data12,
    universities13: universities.data13,
    universities14: universities.data14,
    universities15: universities.data15,
    universities16: universities.data16,
    universities17: universities.data17,
    universities18: universities.data18,
    universities19: universities.data19,
    universities20: universities.data20,
    universities21: universities.data21,
    universities22: universities.data22,
    universities23: universities.data23,
    universities24: universities.data24,
    universities25: universities.data25,
    universities26: universities.data26,
    universities27: universities.data27,
    universities28: universities.data28,
    universities29: universities.data29,
    universities30: universities.data30,
    universities31: universities.data31,
    universities32: universities.data32,
    universities33: universities.data33,
    universities34: universities.data34,
    universities35: universities.data35,
    universities36: universities.data36,
    universities37: universities.data37,
    universities38: universities.data38,
    universities39: universities.data39,
    universities40: universities.data40,
    universities41: universities.data41,
    universities42: universities.data42,
    universities43: universities.data43,
    universities44: universities.data44,
    universities45: universities.data45,
    universities46: universities.data46,
    universities47: universities.data47,
    universities48: universities.data48,
    universities49: universities.data49,
    universities50: universities.data50,
  }),
  methods: {
    select(university){
      this.$emit('selectUniversity', university);
    },
  }
}
</script>