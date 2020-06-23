package com.markerhub.common.lang;

import lombok.Data;
import org.apache.ibatis.io.ResolverUtil;

import java.io.Serializable;

@Data
public class Result implements Serializable {
    //200 正常 ;非200 异常
    private int code;
    private String msg;
    private Object data;

    public static int SUCCESS = 200;
    public static int ERROR = 400;

    public static Result success(int code, String msg, Object data) {
        Result r = new Result();
        r.setCode(code);
        r.setMsg(msg);
        r.setData(data);
        return r;
    }

    public static Result fail(int code, String msg, Object data) {
        Result r = new Result();
        r.setCode(code);
        r.setMsg(msg);
        r.setData(data);
        return r;
    }

    public static Result success(Object data) {
        return success(SUCCESS, "操作成功", data);
    }

    public static Result fail(String msg, Object data) {
        return fail(ERROR, msg, data);
    }

    public static Result fail(String msg) {
        return fail(ERROR, msg, null);
    }
}
