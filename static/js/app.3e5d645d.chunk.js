(this.webpackJsonp=this.webpackJsonp||[]).push([[0],{210:function(e,t,n){e.exports=n(256)},256:function(e,t,n){"use strict";n.r(t);var r=n(167),a=n(267),o=n(203),c=n(0),i=n.n(c),u=n(45),l=n(169),s=n(141),d=n(49),m=n(55),f=Object(d.b)({selectId:function(e){return e.id},sortComparer:function(e,t){var n=new Date(e.createdAt),r=new Date(t.createdAt);return n<r?-1:r<n?1:0}}),p=Object(d.c)({name:"journalEntries",initialState:f.getInitialState(),reducers:{journalEntryAdded:f.addOne,deleteJournalEntry:f.removeOne}}),h=f.getSelectors((function(e){return e.journalEntries})),E=Object(d.b)({selectId:function(e){return e.id},sortComparer:function(e,t){return e.name<t.name?-1:t.name<e.name?1:0}}),b=Object(d.c)({name:"spotFavorites",initialState:E.getInitialState(),reducers:{spotFavoriteAdded:E.addOne,removeSpotFavorite:E.removeOne}}),v=E.getSelectors((function(e){return e.spotFavorites})),g={key:"journal_entries",version:1,storage:s.a},y={key:"spot_favorites",version:1,storage:s.a},w=Object(d.a)({reducer:{journalEntries:Object(m.g)(g,p.reducer),spotFavorites:Object(m.g)(y,b.reducer)},middleware:Object(d.d)({serializableCheck:{ignoredActions:[m.a,m.f,m.b,m.c,m.d,m.e]}})}),S=Object(m.h)(w),j=n(264),O=n(266),x=n(265),k=n(14),C=n.n(k),B=n(37),P=n(3),F=n(78),J=n(4),A=n(202),I=n(262),H=n(15),T=n.n(H),z=n(23),L=n(69),D=n(27),R=n(194),N=n(51),U=n(8),_=n.n(U),W=n(10),q=n.n(W),G=function(){function e(){_()(this,e)}return q()(e,null,[{key:"baseFetch",value:function(e){var t,n;return T.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,T.a.awrap(fetch("https://services.surfline.com"+e,{headers:{Accept:"application/json","Content-Type":"application/json"}}));case 2:if((t=r.sent).ok){r.next=8;break}throw(n=new Error(t.statusText)).response=t,n.statusCode=t.status,n;case 8:return r.next=10,T.a.awrap(t.json());case 10:return r.abrupt("return",r.sent);case 11:case"end":return r.stop()}}),null,null,null,Promise)}},{key:"createParamString",value:function(e){return Object.keys(e).filter((function(t){return void 0!==e[t]&&null!==e[t]})).map((function(t){return encodeURIComponent(t)+"="+encodeURIComponent(e[t])})).join("&")}},{key:"searchSpots",value:function(e){var t,n,r;return T.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,T.a.awrap(this.baseFetch("/search/site?q="+e+"&querySize=1&suggestionSize=1"));case 2:if(t=a.sent,(n=t[0].hits.hits).length){a.next=6;break}return a.abrupt("return",null);case 6:return r=n[0],a.abrupt("return",{id:r._id,name:r._source.name,permalink:r._source.href});case 8:case"end":return a.stop()}}),null,this,null,Promise)}},{key:"findPrimarySwell",value:function(e){return e[0]}},{key:"fetchReport",value:function(t){var n,r,a,o;return T.a.async((function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,T.a.awrap(this.baseFetch("/kbyg/spots/reports?spotId="+t));case 2:return n=c.sent,r=n.spot.cameras[0],a=n.forecast,o=n.report,c.abrupt("return",{cam:{cameraStillUrl:null==r?void 0:r.stillUrl,cameraRewindClipUrl:null==r?void 0:r.rewindClip},forecast:{rating:a.conditions.value,wind:{speed:a.wind.speed,direction:a.wind.direction},weather:{temperature:a.weather.temperature},wave:{minHeight:a.waveHeight.min,maxHeight:a.waveHeight.max,occasionalHeight:a.waveHeight.occasional,plusHeight:a.waveHeight.plus,human:a.waveHeight.humanRelation},tide:{type:a.tide.current.type},primarySwell:e.findPrimarySwell(a.swells)},report:{body:null==o?void 0:o.body}});case 7:case"end":return c.stop()}}),null,this,null,Promise)}}]),e}(),V=n(191),M=n.n(V);function K(e){return e?e.toLowerCase():null}function Q(e){var t=e.occasionalHeight?" occ. "+e.occasionalHeight:"",n=e.plusHeight?"+":"";return e.minHeight+"-"+e.maxHeight+"ft"+t+n}function X(e){return"Tide: "+e.type.toLowerCase()}function Y(e){return"Wind: "+e.speed+"kts, "+e.direction+"\xb0"}function Z(e){return"Primary Swell: "+e.height+"ft at "+e.period+"s "+e.direction}function $(e){var t=e.wave,n=e.wind,r=e.rating,a=e.tide,o=e.primarySwell;return[K(r),Q(t),X(a),Y(n),Z(o)].filter((function(e){return e})).join("\n")}var ee=Object(u.b)((function(e){return{spotFavorites:v.selectAll(e)}}))((function(e){var t,n=e.searchText,r=e.spotFavorites,a=Object(u.c)(),o=Object(c.useState)(!0),l=C()(o,2),s=l[0],d=l[1],m=Object(c.useState)(null),f=C()(m,2),p=f[0],h=f[1];if(Object(z.useFocusEffect)(i.a.useCallback((function(){var e=!0;return function(){var t,r;T.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return d(!0),a.prev=1,a.next=4,T.a.awrap(G.searchSpots(n));case 4:if(!(t=a.sent)){a.next=10;break}return a.next=8,T.a.awrap(G.fetchReport(t.id));case 8:r=a.sent,e&&h({report:r,spot:t});case 10:a.next=15;break;case 12:a.prev=12,a.t0=a.catch(1),e&&h(a.t0);case 15:return a.prev=15,d(!1),a.finish(15);case 18:case"end":return a.stop()}}),null,null,[[1,12,15,18]],Promise)}(),function(){e=!1}}),[n])),s)return i.a.createElement(R.a,{size:"large",animating:!0});if(p instanceof Error)return i.a.createElement(D.a,null,"Error: ",p.message);if(!p)return i.a.createElement(J.a,null);var E=null==(t=p.report)?void 0:t.cam.cameraStillUrl,v=r.find((function(e){return e.id===p.spot.id}));return i.a.createElement(N.a,{style:te.container},i.a.createElement(J.a,{style:te.saveButton},i.a.createElement(O.a.Button,{name:v?"star":"star-outline",backgroundColor:v?"green":"gold",onPress:function(){a(v?b.actions.removeSpotFavorite(p.spot.id):b.actions.spotFavoriteAdded(p.spot))}},v?"Unfavorite":"Favorite")),E?i.a.createElement(L.a,{style:te.camImage,source:{uri:E}}):null,i.a.createElement(D.a,null,p.spot.name),i.a.createElement(D.a,null,function(e){var t=e.forecast,n=t.wave,r=t.wind,a=t.rating,o=t.tide,c=t.primarySwell;return[K(a),Q(n),X(o),Y(r),Z(c),"",e.report.body?M()(e.report.body):""].filter((function(e){return null!==e})).join("\n")}(p.report)))})),te=P.a.create({container:{flex:1},saveButton:{marginBottom:30},camImage:{width:150,height:150,marginBottom:30}}),ne=function(){var e=Object(c.useState)(""),t=C()(e,2),n=t[0],r=t[1],a=Object(c.useState)(""),o=C()(a,2),u=o[0],l=o[1];return i.a.createElement(I.a,{style:re.container},i.a.createElement(J.a,{style:re.searchBar},i.a.createElement(A.a,{value:n,keyboardType:"default",onChangeText:function(e){return r(e)},placeholder:"Search for a Spot",style:re.input,onSubmitEditing:function(){B.a.dismiss(),l(n)}}),i.a.createElement(F.a,{onPress:function(){B.a.dismiss(),l(n)},style:re.searchButton},i.a.createElement(O.a,{name:"search-circle",color:"blue",size:30}))),i.a.createElement(ee,{searchText:u}))},re=P.a.create({container:{flex:1,padding:20,backgroundColor:"#fff"},searchBar:{flexDirection:"row"},searchButton:{flexGrow:0},input:{flexGrow:1,padding:4,marginBottom:20,borderBottomColor:"#ddd",borderBottomWidth:1}}),ae=function(e){var t=e.on,n=e.onPress;return i.a.createElement(O.a.Button,{name:t?"star":"star-outline",backgroundColor:"white",style:ce.star,color:"gold",onPress:n})},oe=function(e){return i.a.createElement(J.a,{style:ce.container},[1,2,3,4,5].map((function(t){return i.a.createElement(ae,{key:"star-"+t,on:e.value>=t,onPress:function(){return e.onChange(t)}})})))},ce=P.a.create({container:{flexDirection:"row",justifyContent:"space-between",width:175},star:{width:30,height:30,marginEnd:5,padding:0}}),ie=P.a.create({container:{flex:1,padding:20,backgroundColor:"#fff"},date:{fontSize:14,marginTop:10},body:{marginTop:10,fontSize:16},deleteButton:{marginTop:40}}),ue=Object(u.b)((function(e,t){return{journalEntry:h.selectById(e,t.route.params.id)}}))((function(e){var t=e.navigation,n=e.journalEntry,r=Object(u.c)();if(c.useLayoutEffect((function(){t.setOptions({title:n?n.spot.name:"Not Found"})}),[t]),!n)return c.createElement(J.a,{style:ie.container},c.createElement(D.a,null,"Not Found"));return c.createElement(J.a,{style:ie.container},c.createElement(D.a,{style:ie.date},new Date(n.createdAt).toLocaleString()),c.createElement(D.a,{style:ie.body},n.body),c.createElement(D.a,{style:ie.body},$(n.forecast)),c.createElement(oe,{value:n.rating,onChange:function(){}}),c.createElement(J.a,{style:ie.deleteButton},c.createElement(O.a.Button,{name:"trash-bin",backgroundColor:"red",onPress:function(){return T.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:r(p.actions.deleteJournalEntry(n.id)),t.pop();case 2:case"end":return e.stop()}}),null,null,null,Promise)}},"Delete")))})),le=n(83),se=n(201),de=function(e){return c.createElement(se.a,{onPress:function(){return e.onPress(e.journalEntry)},style:function(e){return[{backgroundColor:e.pressed?"#eee":"#fff"},me.item]}},c.createElement(D.a,{style:me.title},e.journalEntry.spot.name),c.createElement(D.a,{style:me.date},new Date(e.journalEntry.createdAt).toLocaleString()))},me=P.a.create({item:{padding:20},title:{fontSize:16},date:{marginTop:8,color:"#666",fontSize:14}}),fe=function(){return c.createElement(J.a,{style:{height:P.a.hairlineWidth}})},pe=function(e){return c.createElement(le.a,{data:e.journalEntries,renderItem:function(t){var n=t.item;return c.createElement(de,{journalEntry:n,onPress:e.onPressJournalEntry})},keyExtractor:function(e){return e.id},ItemSeparatorComponent:fe})},he=Object(u.b)((function(e){return{journalEntries:h.selectAll(e)}}))((function(e){var t=e.navigation,n=e.journalEntries;return Object(c.useLayoutEffect)((function(){t.setOptions({headerRight:function(){return i.a.createElement(O.a.Button,{onPress:function(){return t.navigate("NewJournalEntryScreen")},backgroundColor:"white",name:"add",color:"blue",size:30})}})}),[t]),i.a.createElement(pe,{journalEntries:n,onPressJournalEntry:function(e){t.push("JournalEntryDetailsScreen",{id:e.id})}})})),Ee=Object(j.a)(),be=function(){return i.a.createElement(Ee.Navigator,null,i.a.createElement(Ee.Screen,{name:"JournalEntryListScreen",component:he,options:{title:"Surf Journal"}}),i.a.createElement(Ee.Screen,{name:"JournalEntryDetailsScreen",component:ue}))},ve=Object(x.a)(),ge=function(){return i.a.createElement(ve.Navigator,{screenOptions:function(e){var t=e.route;return{tabBarIcon:function(e){var n=e.focused,r=e.color,a=e.size;switch(t.name){case"JournalEntriesStack":return i.a.createElement(O.a,{name:n?"journal":"journal-outline",size:a,color:r});case"ForecastScreen":return i.a.createElement(O.a,{name:n?"rainy":"rainy-outline",size:a,color:r})}}}}},i.a.createElement(ve.Screen,{name:"JournalEntriesStack",component:be,options:{tabBarLabel:"Journal"}}),i.a.createElement(ve.Screen,{name:"ForecastScreen",component:ne,options:{tabBarLabel:"Forecast"}}))},ye=n(126),we=n(137),Se=n.n(we),je=n(138),Oe=n(48),xe=Object(u.b)((function(e){return{spotFavorites:v.selectAll(e)}}))((function(e){var t=e.navigation,n=e.spotFavorites,r=Object(u.c)(),a=Object(c.useState)(""),o=C()(a,2),l=o[0],s=o[1],m=Object(c.useState)(0),f=C()(m,2),h=f[0],E=f[1],b=Object(c.useState)("invalid"),v=C()(b,2),g=v[0],y=v[1];return Object(c.useLayoutEffect)((function(){t.setOptions({headerLeft:null,headerRight:function(){return i.a.createElement(je.a,{title:"Cancel",onPress:function(){return t.pop()}})}})}),[t]),i.a.createElement(J.a,{style:ke.container},i.a.createElement(Oe.a,{value:l,keyboardType:"default",onChangeText:function(e){return s(e)},placeholder:"Note",style:ke.input}),i.a.createElement(oe,{value:h,onChange:function(e){return E(e)}}),i.a.createElement(ye.a,{selectedValue:g,style:{height:50,width:100},onValueChange:function(e){return y(e)}},i.a.createElement(ye.a.Item,{label:"Select a Spot",value:"invalid"}),n.map((function(e){return i.a.createElement(ye.a.Item,{label:e.name,value:e.id})}))),i.a.createElement(je.a,{onPress:function(){var e,a,o;return T.a.async((function(c){for(;;)switch(c.prev=c.next){case 0:return c.prev=0,c.next=3,T.a.awrap(G.fetchReport(Se()(g)));case 3:o=c.sent,a=o.forecast,e=Se()(n.find((function(e){return e.id===g}))),c.next=12;break;case 8:return c.prev=8,c.t0=c.catch(0),y("invalid"),c.abrupt("return");case 12:r(p.actions.journalEntryAdded({id:Object(d.e)(),body:l,createdAt:(new Date).toString(),spot:e,forecast:a,rating:h})),t.pop();case 14:case"end":return c.stop()}}),null,null,[[0,8]],Promise)},disabled:0===h||!l||"invalid"===g,title:"Save"}))})),ke=P.a.create({container:{flex:1,padding:20,backgroundColor:"#fff"},input:{padding:4,marginBottom:20,borderBottomColor:"#ddd",borderBottomWidth:1}}),Ce=Object(j.a)(),Be=function(){return i.a.createElement(Ce.Navigator,{mode:"modal"},i.a.createElement(Ce.Screen,{name:"MainTabs",component:ge,options:{headerShown:!1}}),i.a.createElement(Ce.Screen,{name:"NewJournalEntryScreen",component:xe,options:{title:"Add Journal Entry"}}))};Object(a.a)((function(){return c.createElement(u.a,{store:w},c.createElement(l.a,{loading:null,persistor:S},c.createElement(r.a,null,c.createElement(o.a,{style:"auto"}),c.createElement(Be,null))))}))}},[[210,1,2]]]);
//# sourceMappingURL=app.3e5d645d.chunk.js.map