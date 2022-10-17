from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import time
import datetime
#from diffusers import StableDiffusionPipeline
from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

t5tokenizer = AutoTokenizer.from_pretrained("Yuetian/T5-finetuned-storyCommonsense")
t5model = AutoModelForSeq2SeqLM.from_pretrained("Yuetian/T5-finetuned-storyCommonsense")
"""
pipeSD = StableDiffusionPipeline.from_pretrained(image_gen_model_id, use_auth_token=True)
if local:
    pipeSD = StableDiffusionPipeline.from_pretrained(image_gen_model_id, torch_dtype=torch.float16, revision="fp16", use_auth_token=True)    
pipeSD = pipeOPT.to(device)
"""

@app.route('/t5gen', methods = ['GET'])
def genSentenceWithPrompt():
    print(request.args.get('keywords'), request.args.get('emotions'))
    input_text = f"Generate next sentence based on folowing:<extra_id_0>KEYWORDS: {request.args.get('keywords')}" + f"<extra_id_0>CONTEXT: {request.args.get('keywords')}" + f"<extra_id_0>EMOTION: {request.args.get('keywords')}"
    features = t5tokenizer([input_text], return_tensors='pt')
    max_length = 32
    output = t5model.generate(input_ids=features['input_ids'], 
                            attention_mask=features['attention_mask'],
                            max_length=max_length)
    returnstr = t5tokenizer.decode(output[0], skip_special_tokens=True)
    return jsonify({"generatedText": returnstr})
"""
@app.route('/stablediffusion', methods = ['GET'])
def genImg():
    prompt = f"A colorful photo telling a story that {sentence.lower()}" # try tuning
    with autocast("cuda"):
        image = pipeSD(prompt, guidance_scale=7.5).images[0]  
    now = datetime.datetime.now()
    now = now.replace(":", ".")
    jpgname = "./images/"+now+'.jpg'
    image.save(jpgname)
    return jpgname
  """
if __name__ == '__main__':
    app.run()
  