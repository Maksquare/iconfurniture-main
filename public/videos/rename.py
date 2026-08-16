import os

# Configuration
folder_path = "."  # Change to your folder path
prefix = "ifvideo_"  # Change to your desired prefix
start_number = 1
digits = 3  # e.g. 001, 002, ...

# Common video extensions
video_extensions = (".mp4", ".mov", ".avi")

def rename_videos(folder_path, prefix, start_number, digits):
    files = [f for f in os.listdir(folder_path)
              if f.lower().endswith(video_extensions)]
    files.sort()  # sort alphabetically/numerically as they appear

    counter = start_number
    for filename in files:
        ext = os.path.splitext(filename)[1]
        new_name = f"{prefix}{str(counter).zfill(digits)}{ext}"

        old_path = os.path.join(folder_path, filename)
        new_path = os.path.join(folder_path, new_name)

        os.rename(old_path, new_path)
        print(f"Renamed: {filename} -> {new_name}")

        counter += 1

if __name__ == "__main__":
    rename_videos(folder_path, prefix, start_number, digits)