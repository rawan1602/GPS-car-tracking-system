from __init__ import create_app
from routes import main

app = create_app()
app.register_blueprint(main, url_prefix='/')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
