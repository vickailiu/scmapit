from flask import Flask, render_template, json, request
# from flaskext.mysql import MySQL

# mysql = MySQL()

app = Flask(__name__, static_url_path='/public', static_folder='public')

# MySQL configurations
# app.config['MYSQL_DATABASE_USER'] = ''
# app.config['MYSQL_DATABASE_PASSWORD'] = ''
# app.config['MYSQL_DATABASE_DB'] = ''
# app.config['MYSQL_DATABASE_HOST'] = ''
# mysql.init_app(app)

def byteify(input):
    if isinstance(input, dict):
        return {byteify(key):byteify(value) for key,value in input.iteritems()}
    elif isinstance(input, list):
        return [byteify(element) for element in input]
    elif isinstance(input, unicode):
        return input.encode('utf-8')
    else:
        return input

@app.route('/', defaults={'path': ''})
# @app.route('/<path:path>')
def template_test(path):
	data = None
	# if path != '':
	# 	print path
	# 	try:
	# 		cursor = mysql.get_db().cursor()
	# 		query = "SELECT `map` FROM `maps` WHERE `key` = '" + path + "'"
	# 		print query
	# 		cursor.execute(query)
	# 		string = cursor.fetchone()[0]
	# 		print string
	# 		data = byteify(json.loads(string))
	# 		print data
	# 	except Exception as e:
	# 		print e
	# 	finally:
	# 		cursor.close() 
	return render_template('template.html', data = data if data else '')


if __name__ == '__main__':
	app.run(debug=True)