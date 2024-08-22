import frappe

#@frappe.whitelist()
#def execute_function(*args,**kwargs):
#    """
#    This fonction will be executed when the Execute Action Button will be clicked
#    """
#    print('Hello World')
#    # The data is transmitted via keyword argument
#    print(kwargs)

@frappe.whitelist()
def get_logged_user():
    return frappe.session.user

@frappe.whitelist()
def generare_comanda_productie(frm):
    return frm
