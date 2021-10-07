---
    to: renderer/state/<%= h.capitalize(name) %>.ts
---
import {atom} from "recoil";

const <%= h.capitalize(name) %>Atom = atom({key: '<%= h.capitalize(name) %>State',default:''})

export default <%= h.capitalize(name) %>Atom
