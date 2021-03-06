package com.wl.testaction.warehouse.PR;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.wl.forms.Checkout;
import com.wl.forms.PrDetail;
import com.wl.tools.Sqlhelper;
import com.wl.tools.StringUtil;

public class PrStatisticsServlet extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public PrStatisticsServlet() {
		super();
	}

	/**
	 * The doGet method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to get.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		doPost(request,response);
	}

	/**
	 * The doPost method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to post.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html;charset=utf-8");
		request.setCharacterEncoding("utf-8");
		int pageNow=Integer.parseInt(request.getParameter("pageIndex"))+1;
		int pageSize=Integer.parseInt(request.getParameter("pageSize"));
		int totalCount=0;
		String startDate=StringUtil.isNullOrEmpty(request.getParameter("startDate"))?"":request.getParameter("startDate");
		String endDate=StringUtil.isNullOrEmpty(request.getParameter("endDate"))?"":request.getParameter("endDate");
		String companyId=StringUtil.isNullOrEmpty(request.getParameter("companyId"))?"":request.getParameter("companyId");
		String payMethod=(StringUtil.isNullOrEmpty(request.getParameter("payMethod"))?"":request.getParameter("payMethod")).toString();
		String totalCountSql="";
		String prSql="";
		String viewSql="";
		if(payMethod.equals("")){
			viewSql="create or replace view prdetailView as select M.* from prdetail M ";
			
		}else{
			viewSql="create or replace view prdetailView as select M.* from prdetail M where paymethod='"+payMethod+"'";
		}
		
		try {
			Sqlhelper.executeUpdate(viewSql, null);
		} catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
		}
		
		
		
		
		if(startDate.equals("")&&endDate.equals("")&&companyId.equals("")){
			totalCountSql="select count(*) from pr A left join prdetail B on B.prsheetid=A.prsheetid where B.status='1'";
			prSql="select prdate,prsheetid,customerid,C.companyname customerName,B.connector,itemid,itemname,spec,innum,unitprice,price,unit," +
			"          warehouseid,D.warehouse_Name,itemtype,ussage,stockid,paymethod from (select A.*,rownum rn from " +
			"          (select E.prdate,E.prsheetid pr_sheetid,E.customerid,E.connector,M.* from pr E left join prdetailView M on M.prsheetid=E.prsheetid " +
			"          where status='1' order by prdate asc,E.prsheetid asc) A where rownum<="+pageSize*pageNow+" order by prdate asc,prsheetid asc) B " +
			"             left join supplier C on C.companyid=B.customerid " +
			"             left join warehouse D on D.warehouse_id=B.warehouseid " +
			"             left join itemtype F on F.item_typeid=B.itemtype " +
			"             where rn>="+(pageSize*(pageNow-1)+1)+"";
		}else if(!startDate.equals("")&&!endDate.equals("")&&companyId.equals("")){
			totalCountSql="select count(*) from pr A left join prdetail B on B.prsheetid=A.prsheetid where B.status='1' and " +
					"prdate between to_date('"+startDate+"','yyyy-mm-dd,hh24:mi:ss') and to_date('"+endDate+"','yyyy-mm-dd,hh24:mi:ss')";
			prSql="select prdate,prsheetid,customerid,C.companyname customerName,B.connector,itemid,itemname,spec,innum,unitprice,price,unit," +
			"          warehouseid,D.warehouse_Name,itemtype,ussage,stockid,paymethod from (select A.*,rownum rn from " +
			"          (select E.prdate,E.prsheetid pr_sheetid,E.customerid,E.connector,M.* from pr E left join prdetailView M on M.prsheetid=E.prsheetid " +
			"          where status='1' and prdate between to_date('"+startDate+"','yyyy-mm-dd,hh24:mi:ss') and to_date('"+endDate+"','yyyy-mm-dd,hh24:mi:ss') " +
			"		   order by prdate asc,E.prsheetid asc) A where rownum<="+pageSize*pageNow+" order by prdate asc,prsheetid asc) B " +
			"             left join supplier C on C.companyid=B.customerid " +
			"             left join warehouse D on D.warehouse_id=B.warehouseid " +
			"             left join itemtype F on F.item_typeid=B.itemtype " +
			"              where rn>="+(pageSize*(pageNow-1)+1)+"";
		
		}else if(startDate.equals("")&&endDate.equals("")&&!companyId.equals("")){
			totalCountSql="select count(*) from pr A left join prdetail B on B.prsheetid=A.prsheetid where B.status='1' and A.customerid='"+companyId+"'";
			prSql="select prdate,prsheetid,customerid,C.companyname customerName,B.connector,itemid,itemname,spec,innum,unitprice,price,unit," +
			"          warehouseid,D.warehouse_Name,itemtype,ussage,stockid,paymethod from (select A.*,rownum rn from " +
			"          (select E.prdate,E.prsheetid pr_sheetid,E.customerid,E.connector,M.* from pr E left join prdetailView M on M.prsheetid=E.prsheetid " +
			"          where status='1' and E.customerid='"+companyId+"' order by prdate asc,E.prsheetid asc) A where rownum<="+pageSize*pageNow+" order by prdate asc,prsheetid asc) B " +
			"             left join supplier C on C.companyid=B.customerid " +
			"             left join warehouse D on D.warehouse_id=B.warehouseid " +
			"             left join itemtype F on F.item_typeid=B.itemtype " +
			"             where rn>="+(pageSize*(pageNow-1)+1)+"";
		}else if(!startDate.equals("")&&!endDate.equals("")&&!companyId.equals("")){
			totalCountSql="select count(*) from pr A left join prdetail B on B.prsheetid=A.prsheetid where B.status='1' and " +
			"prdate between to_date('"+startDate+"','yyyy-mm-dd,hh24:mi:ss') and to_date('"+endDate+"','yyyy-mm-dd,hh24:mi:ss') and customerid='"+companyId+"'";
			prSql="select prdate,prsheetid,customerid,C.companyname customerName,B.connector,itemid,itemname,spec,innum,unitprice,price,unit," +
			"          warehouseid,D.warehouse_Name,itemtype,ussage,stockid,paymethod from (select A.*,rownum rn from " +
			"          (select E.prdate,E.prsheetid pr_sheetid,E.customerid,E.connector,M.* from pr E left join prdetailView M on M.prsheetid=E.prsheetid " +
			"          where status='1' and prdate between to_date('"+startDate+"','yyyy-mm-dd,hh24:mi:ss') and to_date('"+endDate+"','yyyy-mm-dd,hh24:mi:ss')  and customerid='"+companyId+"' " +
			"		   order by prdate asc,E.prsheetid asc) A where rownum<="+pageSize*pageNow+" order by prdate asc,prsheetid asc) B " +
			"             left join supplier C on C.companyid=B.customerid " +
			"             left join warehouse D on D.warehouse_id=B.warehouseid " +
			"             left join itemtype F on F.item_typeid=B.itemtype " +
			"              where rn>="+(pageSize*(pageNow-1)+1)+"";
		}
		
		try{
			totalCount=Sqlhelper.exeQueryCountNum(totalCountSql, null);
		}catch(Exception e){
			e.printStackTrace();
		}
		
		List<PrDetail> resultList=new ArrayList<PrDetail>();
		try{
			resultList=Sqlhelper.exeQueryList(prSql, null, PrDetail.class);
			String json = PluSoft.Utils.JSON.Encode(resultList); 
			json = "{\"total\":"+totalCount+",\"data\":"+json+"}";
			response.getWriter().append(json).flush();
			System.out.println(json);
		}catch(Exception e){
			e.printStackTrace();
		}
		
	}

}
