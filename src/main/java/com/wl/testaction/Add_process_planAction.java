/*
 * Generated by MyEclipse Struts
 * Template path: templates/java/JavaClass.vtl
 */
package com.wl.testaction;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.actions.DispatchAction;

import com.wl.tools.Sqlhelper;

public class Add_process_planAction extends DispatchAction {

	public ActionForward addprocess(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		
		System.out.println("进入Add_process_planAction的addprocess函数体了已经!!!");
		String processid=request.getParameter("processid");
		String productid=request.getParameter("productid");
		String starttime=request.getParameter("starttime");
		String finishtime=request.getParameter("finishtime");
		String processplan_a=request.getParameter("processplan_a");
		String processplan_b=request.getParameter("processplan_b");
		String plan_id=request.getParameter("plan_id");

		String sql ="insert into process_plan(OPER_ID,EQUIPMENT_DRAWID,START_TIME,END_TIME,processplan_a,processplan_b,plan_id) values('"
			+processid+"','"+productid+"',to_date('"+starttime+"','yyyy-mm-dd'),to_date('"+
			finishtime+"','yyyy-mm-dd'),"+processplan_a+",'"+processplan_b+"','"+plan_id+"')";
		
		System.out.println("插入工序的sql++"+sql);
		System.out.println("插入工序的sql++");
		
		try {
			Sqlhelper.executeUpdate(sql, null);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			System.out.println("Add_process_planAction出现异常！！！");
			return mapping.findForward("err");
		}
		
		
		return mapping.findForward("ok");
	}
}