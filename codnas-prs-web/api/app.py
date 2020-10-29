import time
import informacion_general
from flask import Flask, jsonify
from flask_mysqldb import MySQL
from flask_restful import Resource, Api, reqparse

app = Flask(__name__)

# Configurar DB
#app.config['MYSQL_HOST'] = 'dp2.ckptsjkylhhm.us-east-1.rds.amazonaws.com'
#app.config['MYSQL_USER'] = 'admin'
#app.config['MYSQL_PASSWORD'] = 'tunquesino10'
#app.config['MYSQL_DB'] = 'codnas-prs'
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'tunquesino10'
app.config['MYSQL_DB'] = 'codnas-prs'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)

api = Api(app)

class GetInfoGeneral(Resource):
  def get(self, pdb_id):
    try:
      _pdbId = pdb_id
      conn = mysql.connection
      cursor = conn.cursor()
      stmt = ("select * from info_general where pdb_id = %(pdb_id)s")
      cursor.execute(stmt, { 'pdb_id': _pdbId })
      data = cursor.fetchall()
      r = {
        'StatusCode': '200',
        'Message': 'Success',
        'InfoGeneral': data
      }
      return r
    except Exception as e:
      return { 'error': str(e) }

class GetConformacion(Resource):
  def get(self, pdb_id):
    try:
      _pdbId = pdb_id
      conn = mysql.connection
      cursor = conn.cursor()
      stmt = ("select * from conformacion where pdb_id = %(pdb_id)s")
      cursor.execute(stmt, { 'pdb_id': _pdbId })
      data = cursor.fetchall()
      r = {
        'StatusCode': '200',
        'Message': 'Success',
        'Conformacion': data
      }
      return r
    except Exception as e:
      return { 'error': str(e) }

class GetInfoEstructural(Resource):
  def get(self, pdb_id):
    try:
      _pdbId = pdb_id
      conn = mysql.connection
      cursor = conn.cursor()
      stmt = ("select * from info_estructural where pdb_id = %(pdb_id)s")
      cursor.execute(stmt, { 'pdb_id': _pdbId })
      data = cursor.fetchall()
      r = {
        'StatusCode': '200',
        'Message': 'Success',
        'InfoEstructural': data
      }
      return r
    except Exception as e:
      return { 'error': str(e) }

class EstimarInfoGeneral(Resource):
  def get(self, pdb_id):
    try:
      _pdbId = pdb_id
      value = informacion_general.obtener(_pdbId)
      return value
    except Exception as e:
      return { 'error': str(e) }

api.add_resource(GetInfoGeneral, '/api/GetInfoGeneral/<pdb_id>')
api.add_resource(GetConformacion, '/api/GetConformacion/<pdb_id>')
api.add_resource(GetInfoEstructural, '/api/GetInfoEstructural/<pdb_id>')
api.add_resource(EstimarInfoGeneral, '/api/EstimarInfoGeneral/<pdb_id>')

#if __name__ == '__main__':
#  app.run()