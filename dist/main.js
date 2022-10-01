(()=>{"use strict";class t{constructor(e,s,i,n){this.ticketsWrapper=document.querySelector(".tickets"),this.id=e,this.name=s,this.status=i,this.created=n;const a=t.formatDate(this.created);let d;const c=document.createElement("div");return c.classList.add("ticket"),c.dataset.id=this.id,d="true"===this.status||!0===this.status?"checked":"",c.innerHTML=`<div class="ticket-view">\n                 <label class="ticket-label">\n                   <input type="checkbox" class="ticket-checkbox" ${d}>\n                   <span class="ticket-span"></span>\n                 </label>\n                 <div class="ticket-content">\n                   <div class="ticket-name">${this.name}</div>\n                 </div>\n               </div>\n               <div class="ticket-created">${a}</div>\n               <div class="ticket-control">\n                 <button type="button" class="edit-btn">&#9998</button>\n                 <button type="button" class="delete-btn">X</button>\n               </div>\n`,c}static formatDate(t){const e=new Date(t);let s=e.getDate();const i=e.getMonth(),n=e.getFullYear();let a=e.getHours(),d=e.getMinutes();return s=s<10?`0${s}`:s,a=a<10?`0${a}`:a,d=d<10?`0${d}`:d,`${s}.${i}.${n} ${a}:${d}`}}class e{allTickets(){return new Promise(((t,e)=>{const s=new XMLHttpRequest;s.open("GET","https://http-helpdeskr-backend.herokuapp.com/?method=allTickets"),s.addEventListener("load",(()=>{if(s.status>=200&&s.status<300)try{const e=JSON.parse(s.response);t(e)}catch(t){e(t)}})),s.send()}))}ticketById(t){return new Promise(((e,s)=>{const i=new XMLHttpRequest;(new URLSearchParams).append("id",t),i.open("GET",`https://http-helpdeskr-backend.herokuapp.com/?method=ticketById&id=${t}`),i.addEventListener("load",(()=>{if(i.status>=200&&i.status<300)try{const t=JSON.parse(i.response);e(t)}catch(t){s(t)}})),i.send()}))}createTicket(t,e){return new Promise(((s,i)=>{const n=new URLSearchParams;n.append("name",t),n.append("description",e);const a=new XMLHttpRequest;a.open("POST","https://http-helpdeskr-backend.herokuapp.com/?method=createTicket"),a.addEventListener("load",(()=>{if(a.status>=200&&a.status<300)try{const t=JSON.parse(a.response);s(t)}catch(t){i(t)}})),a.send(n)}))}removeById(t){return new Promise(((e,s)=>{const i=new XMLHttpRequest;(new URLSearchParams).append("id",t),i.open("DELETE",`https://http-helpdeskr-backend.herokuapp.com/?method=removeById&id=${t}`),i.addEventListener("load",(()=>{if(i.status>=200&&i.status<300)try{const t=JSON.parse(i.response);e(t)}catch(t){s(t)}})),i.send()}))}editTicket(t,e,s){return new Promise(((i,n)=>{const a=new XMLHttpRequest,d=new URLSearchParams;d.append("id",t),d.append("name",e),d.append("description",s),a.open("POST",`https://http-helpdeskr-backend.herokuapp.com/?method=editTicket&id=${t}`),a.addEventListener("load",(()=>{if(a.status>=200&&a.status<300)try{const t=JSON.parse(a.response);i(t)}catch(t){n(t)}})),a.send(d)}))}checkTicket(t,e){return new Promise(((s,i)=>{const n=new XMLHttpRequest,a=new URLSearchParams;a.append("id",t),a.append("status",e),n.open("POST",`https://http-helpdeskr-backend.herokuapp.com/?method=checkTicket&id=${t}`),n.addEventListener("load",(()=>{if(n.status>=200&&n.status<300)try{const t=JSON.parse(n.response);s(t)}catch(t){i(t)}})),n.send(a)}))}}class s{constructor(t){this.parentEl=t,this.modal=document.createElement("div")}init(){this.modal.classList.add("modal","add-modal","hidden"),this.modal.innerHTML='<form class="modal-form">\n                     <h2 class="modal-title">Добавить тикет</h2>\n                     <label class="label-container">\n                       <span class="input-title">Краткое описание</span>\n                       <input class="input-name" type="text" required>\n                     </label>\n                     <label class="label-container">\n                       <span class="input-title">Подробное описание</span>\n                       <textarea class="input-description" type="text" required></textarea>\n                     </label>\n                     <div class="btn-box">\n                       <button class="cancel-btn" type="button">Отмена</button>\n                       <button class="ok-btn" type="submit">Ок</button>\n                     </div>\n                   </form>',this.parentEl.append(this.modal),this.activeModal=document.querySelector(".modal"),this.form=this.modal.querySelector(".modal-form"),this.name=this.modal.querySelector(".input-name"),this.description=this.modal.querySelector(".input-description"),this.cancelBtn=this.modal.querySelector(".cancel-btn"),this.okBtn=this.modal.querySelector(".ok-btn")}openModal(t){this.activeModal.classList.remove("hidden"),this.activeModal.style.top=(window.innerHeight-this.activeModal.offsetHeight)/2+"px",this.activeModal.style.left=(window.innerWidth-this.activeModal.offsetWidth)/2+"px",this.cancelBtn.addEventListener("click",(t=>this.closeModal(t))),this.form.addEventListener("submit",t)}closeModal(t){t.preventDefault(),this.activeModal.classList.add("hidden"),this.form.reset()}}class i{constructor(t,e){this.parentEl=t,this.addModalEl=e,this.modal=document.createElement("div")}init(){this.modal.classList.add("modal","delete-modal","hidden"),this.modal.innerHTML='<h2 class="modal-title">Удалить тикет</h2>\n                     <div class="modal-text">Вы уверены, что хотите удалить тикет? Это действие необратимо.</div>\n                     <div class="btn-box">\n                       <button class="del-cancel-btn" type="button">Отмена</button>\n                       <button class="del-ok-btn" type="submit">Ок</button>\n                     </div>',this.parentEl.append(this.modal),this.deleteModal=document.querySelector(".delete-modal"),this.cancelDelBtn=this.modal.querySelector(".del-cancel-btn"),this.okDelBtn=this.modal.querySelector(".del-ok-btn")}openDeleteModal(){this.addModalEl.modal.classList.contains("hidden")||this.addModalEl.modal.classList.add("hidden"),this.deleteModal.classList.remove("hidden"),this.deleteModal.style.top=(window.innerHeight-this.deleteModal.offsetHeight)/2+"px",this.deleteModal.style.left=(window.innerWidth-this.deleteModal.offsetWidth)/2+"px",this.cancelDelBtn.addEventListener("click",(()=>this.closeDeleteModal()))}closeDeleteModal(){this.deleteModal.classList.add("hidden")}}const n=new class{constructor(){this.container=null,this.ticketsWrapper=document.querySelector(".tickets"),this.modal=new s(document.body),this.deleteModal=new i(document.body,this.modal),this.id=null,this.addBtn=document.querySelector(".add-btn"),this.request=new e,this.addTicket=this.addTicket.bind(this),this.editTicket=this.editTicket.bind(this),this.checkTicket=this.checkTicket.bind(this),this.ticketActions=this.ticketActions.bind(this),this.tickets=[]}bindToDOM(t){if(!(t instanceof HTMLElement))throw new Error('Контейнер не является элементом "HTMLElement"');this.container=t}init(){this.modal.init(),this.deleteModal.init(),this.delOkBtn=document.querySelector(".del-ok-btn"),this.renderAllTickets(),this.addBtn.addEventListener("click",(t=>{t.preventDefault(),this.deleteModal.deleteModal.classList.contains("hidden")||this.deleteModal.deleteModal.classList.add("hidden"),this.modal.modal.classList.contains("hidden")&&(this.modal.modal.querySelector(".modal-title").innerHTML="Добавить тикет",this.modal.modal.querySelector(".input-name").value="",this.modal.modal.querySelector(".input-description").value="",this.modal.openModal(this.addTicket))})),this.delOkBtn.addEventListener("click",(t=>{t.preventDefault(),this.deleteTicket(this.id)}))}renderAllTickets(){this.request.allTickets().then((e=>{this.tickets=[],this.ticketsWrapper.innerHTML="",e.forEach((e=>{const s=new t(e.id,e.name,e.status,e.created);this.tickets.push(s)}));for(const t of this.tickets)this.ticketsWrapper.append(t)})),this.ticketsWrapper.addEventListener("click",this.ticketActions)}ticketActions(t){t.preventDefault();const e=t.target.closest(".ticket");if(this.id=e.dataset.id,t.target.classList.contains("delete-btn")&&this.deleteModal.openDeleteModal(),t.target.classList.contains("edit-btn")){if(!this.modal.modal.classList.contains("hidden"))return;this.deleteModal.deleteModal.classList.contains("hidden")||this.deleteModal.deleteModal.classList.add("hidden"),this.modal.modal.querySelector(".modal-title").innerHTML="Изменить тикет";this.request.ticketById(this.id).then((t=>{this.modal.modal.querySelector(".input-name").value=t.name,this.modal.modal.querySelector(".input-description").value=t.description})),this.modal.openModal((()=>this.editTicket(this.id)))}if(t.target.classList.contains("ticket-name")||t.target.classList.contains("ticket-description")){const t=e.querySelector(".ticket-description");if(t)t.remove();else{this.request.ticketById(this.id).then((t=>{const s=document.createElement("div");s.classList.add("ticket-description"),s.innerText=t.description,e.querySelector(".ticket-content").append(s)}))}}(t.target.classList.contains("ticket-span")||t.target.classList.contains("ticket-checkbox"))&&(e.querySelector(".ticket-checkbox").checked?this.status=!1:this.status=!0,this.checkTicket(this.id,this.status))}addTicket(){this.request.createTicket(this.modal.name.value,this.modal.description.value).then((()=>{this.renderAllTickets()}))}deleteTicket(t){this.deleteModal.closeDeleteModal();this.request.removeById(t).then((()=>{this.renderAllTickets()}))}editTicket(t){this.request.editTicket(t,this.modal.name.value,this.modal.description.value).then((()=>{this.renderAllTickets()}))}checkTicket(t){this.request.checkTicket(t,this.status).then((()=>{this.renderAllTickets()}))}};n.bindToDOM(document.querySelector(".container")),n.init()})();