with open('public/customer.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Add auto-refresh to order history modal fetch if not present
if 'setInterval(fetchMyOrders' not in content:
    # Find where fetchMyOrders is called initially and add interval
    content = content.replace('fetchMyOrders();', 'fetchMyOrders();\n        setInterval(fetchMyOrders, 3000);')
    
    with open('public/customer.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Customer auto-refresh added successfully!")
else:
    print("Auto-refresh already exists.")
