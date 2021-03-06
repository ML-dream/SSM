package com.xm.testaction.qualitycheck.cardhandle;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.repackage.cglib.proxy.Dispatcher;

import com.wl.tools.Sqlhelper;
import com.wl.tools.Sqlhelper0;
import com.xm.testaction.qualitycheck.BarcodeLength;
import com.xm.testaction.qualitycheck.PoFlowBean;
import com.xm.testaction.qualitycheck.SearchFbarcode;

public class ToDiscard extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public ToDiscard() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
		// Put your code here
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
		doPost(request, response);
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
//		报废多批次
//		根barcode
		String fbarcode = request.getParameter("fbarcode");
		String gbarcode = fbarcode;
		String runnum = request.getParameter("runnum");
		
//		9-6
		int ishandle = Integer.parseInt(request.getParameter("ishandle"));
		
		boolean length = BarcodeLength.barcodeLength(fbarcode);
		if(length){
//			如果是子表，则找到 根 barcode
			gbarcode = SearchFbarcode.searchFbarcode(fbarcode);
		}
//			新生成的流程卡号
			String barcode = "";
			
			int status = 3;
//			查询流程卡附表中，多批次状态的序列最大值
			String attachsql="select max(attach_no) from attach_info " +
					"where gbarcode='"+gbarcode+"'";
//			System.out.println("attachsql="+ attachsql);  +"' and status="+status
			int attach_no=1;	//流程卡附表序列，默认从1开始
//			保存附表信息
			
			try {
				String temp = "";
				temp = Sqlhelper.exeQueryString(attachsql, null);
				if(temp!=null && !temp.isEmpty()){
					attach_no = Integer.parseInt(temp)+1;
				}
			} catch (Exception e) {
				// TODO: handle exception
			}
//			ResultSet attachRst=null;
//			try{	
//				attachRst=Sqlhelper0.executeQuery(attachsql, null);
//				attachRst.next();
//				if(attachRst.getString(1) != null){
//					attach_no=attachRst.getInt(1)+1;
//				}
//				
//				
//			}catch (Exception e) {
//				// TODO: handle exception
//			}finally{
//				try {
////					Sqlhelper0.close();
//					if(attachRst != null){
//						try {
//							attachRst.close();
//						} catch (Exception e2) {
//							// TODO: handle exception
//						}
//					}
//				} catch (Exception e) {
//					// TODO: handle exception
//				}
//			}
//				将父流程卡号+序列  串起来
				barcode = gbarcode + attach_no;
			
				try {
					String saveattachsql= "insert into attach_info (barcode,attach_no,status,fbarcode,gbarcode,runnum)" +
						" values ('"+barcode+"',"+attach_no+","+status+",'"+fbarcode+"','"+gbarcode+"','"+runnum+"')";
//					9-6 待矫正
					try {
						if(ishandle==1){
							saveattachsql ="update attach_info set barcode='"+barcode+"',status=3 where runnum='"+runnum+"'";		//如果是修改意见，修改状态为报废
						}
					} catch (Exception e) {
						// TODO: handle exception
					}
					
					System.out.println("savesql="+ saveattachsql);
	    			Sqlhelper0.executeUpdate(saveattachsql,null);
	    			System.out.println("ok "+saveattachsql);
	    			String result ="success";
	    			response.setCharacterEncoding("utf-8");
	    			response.getWriter().append(result).flush();
				} catch (Exception e) {
	    			String result ="failed";
	    			response.setCharacterEncoding("utf-8");
	    			response.getWriter().append(result).flush();
	    			e.printStackTrace();
	    		}finally{
//	    			Sqlhelper0.close();
	    		}
			
			
		
	}

	/**
	 * Initialization of the servlet. <br>
	 *
	 * @throws ServletException if an error occurs
	 */
	public void init() throws ServletException {
		// Put your code here
	}

}
