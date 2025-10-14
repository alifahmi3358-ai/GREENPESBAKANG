from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Data untuk frontend Greenpes Bakang
courses = [
    {"id": 1, "name": "Akhlak & Karakter", "level": 1, "students": 150},
    {"id": 2, "name": "Bahasa Indonesia", "level": 1, "students": 200}
]

@app.route('/api/courses', methods=['GET'])
def get_courses():
    return jsonify(courses)

@app.route('/api/stats', methods=['GET'])
def get_stats():
    return jsonify({
        "total_students": 1250,
        "active_courses": 7,
        "community_rating": 4.8
    })

if __name__ == '__main__':
    print("🎓 GREENPES BAKANG BACKEND READY!")
    print("📍 http://localhost:5000")
    app.run(host='0.0.0.0', port=5000)
