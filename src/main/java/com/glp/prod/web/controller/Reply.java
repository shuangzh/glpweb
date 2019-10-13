package com.glp.prod.web.controller;

import lombok.Data;

import java.util.HashMap;

@Data
public class Reply {

    private int code;

    private String message;

    private HashMap<String, Object> data;

    public static  Reply success(){
        Reply reply = new Reply();
        reply.setCode(0);
        reply.setMessage("success");
        return reply;
    }

    public static Reply failed(){
        Reply r = new Reply();
        r.setCode(1);
        r.setMessage("failed");
        return  r;
    }

    public static  Reply error(String emsg){
        Reply r = new Reply();
        r.setCode(1);
        r.setMessage(emsg);
        return  r;
    }

    public Reply add(String key, Object val){
        if(data == null)
            data = new HashMap<>();
        this.data.put(key, val);
        return  this;
    }

}
